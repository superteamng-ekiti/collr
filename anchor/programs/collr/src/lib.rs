use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("yamX4peqmHmGM7LibiTWkoXyt7fySzVhqeKW1yhF7Zu");

#[program]
pub mod collr {
    use super::*;

    // Initialize the project with a token mint and treasury details
    pub fn initialize(
        ctx: Context<Initialize>,
        token_mint: Pubkey,
        treasury: Pubkey,
        treasury_cut_bps: u16, // Basis points (e.g., 1000 = 10%)
    ) -> Result<()> {
        let global_state = &mut ctx.accounts.global_state;

        // Ensure the project is not already initialized
        require!(!global_state.is_initialized, EngagementError::AlreadyInitialized);

        // Set the token mint, treasury, and mark as initialized
        global_state.token_mint = token_mint;
        global_state.treasury = treasury;
        global_state.treasury_cut_bps = treasury_cut_bps;
        global_state.is_initialized = true;
        global_state.owner = *ctx.accounts.authority.key;

        Ok(())
    }

    // Create a new engagement task and hold tokens
    pub fn create_task(
        ctx: Context<CreateTask>,
        social_media: String,
        engagement_type: String,
        post_url: String,
        total_token_pool: u64,
        num_participants: Option<u64>,
        deadline: i64, // Use i64 explicitly
        bump: u8, // Added bump for PDA derivation
    ) -> Result<()> {
        let clock = Clock::get()?; // Get the current timestamp
        let current_timestamp = clock.unix_timestamp;

        // Ensure the deadline is in the future
        require!(
            deadline > current_timestamp,
            EngagementError::DeadlineInPast
        );

        let task = &mut ctx.accounts.task;

        // Ensure the project is initialized
        let global_state = &ctx.accounts.global_state;
        require!(global_state.is_initialized, EngagementError::NotInitialized);

        // Set task details
        task.social_media = social_media;
        task.engagement_type = engagement_type;
        task.post_url = post_url;
        task.total_token_pool = total_token_pool;
        task.num_participants = num_participants;
        task.deadline = deadline;
        task.creator = *ctx.accounts.creator.key;
        task.is_completed = false;
        task.participants_completed = 0; // Initialize completed participants to 0
        task.participants = Vec::new(); // Initialize participants list
        task.bump = bump; // Store the bump for future PDA signing

        // Calculate treasury cut
        let treasury_cut = (total_token_pool as u128)
            .checked_mul(global_state.treasury_cut_bps as u128)
            .unwrap()
            .checked_div(10_000)
            .unwrap() as u64;

        // Transfer tokens to the task vault (after deducting treasury cut)
        let transfer_to_vault = total_token_pool - treasury_cut;
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.creator_token_account.to_account_info(),
                    to: ctx.accounts.task_vault.to_account_info(),
                    authority: ctx.accounts.creator.to_account_info(),
                },
            ),
            transfer_to_vault,
        )?;

        // Transfer treasury cut to the treasury
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.creator_token_account.to_account_info(),
                    to: ctx.accounts.treasury_token_account.to_account_info(),
                    authority: ctx.accounts.creator.to_account_info(),
                },
            ),
            treasury_cut,
        )?;

        Ok(())
    }

    // Verify task completion (no token distribution here)
    pub fn verify_task(ctx: Context<VerifyTask>, proof_hash: String) -> Result<()> {
        let task = &mut ctx.accounts.task;

        // Ensure the task is not already completed
        require!(!task.is_completed, EngagementError::TaskAlreadyCompleted);

        // Ensure the deadline has not passed
        let clock = Clock::get()?; // Get the current timestamp
        let current_timestamp = clock.unix_timestamp;
        require!(
            task.deadline > current_timestamp,
            EngagementError::DeadlinePassed
        );

        // Verify the proof hash (off-chain verification would be needed)
        task.proof_hash = proof_hash;

        // Add participant to the list
        task.participants.push(*ctx.accounts.participant.key);
        task.participants_completed += 1;

        // Mark the task as completed if the required number of participants is reached
        if let Some(max_participants) = task.num_participants {
            if task.participants_completed >= max_participants {
                task.is_completed = true;
            }
        }

        Ok(())
    }

    // Claim tokens after the task is completed
    pub fn claim(ctx: Context<Claim>) -> Result<()> {
        let task = &mut ctx.accounts.task;

        // Ensure the task is completed
        require!(task.is_completed, EngagementError::TaskNotCompleted);

        // Ensure the deadline has not passed
        let clock = Clock::get()?; // Get the current timestamp
        let current_timestamp = clock.unix_timestamp;
        require!(
            task.deadline > current_timestamp,
            EngagementError::DeadlinePassed
        );

        // Ensure the participant is in the list of participants
        require!(
            task.participants.contains(&ctx.accounts.participant.key()),
            EngagementError::NotAParticipant
        );

        // Calculate reward per participant (after deducting treasury cut)
        let global_state = &ctx.accounts.global_state;
        let reward_per_participant = (task.total_token_pool as u128)
            .checked_mul(10_000 - global_state.treasury_cut_bps as u128)
            .unwrap()
            .checked_div(10_000)
            .unwrap()
            .checked_div(task.participants_completed as u128)
            .unwrap() as u64;

        // Transfer tokens to the participant using PDA signing
        let seeds = &[
            b"task".as_ref(),
            &task.creator.to_bytes(),
            &[task.bump],
        ];
        let signer = &[&seeds[..]];

        // Transfer tokens to the participant
        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.task_vault.to_account_info(),
                    to: ctx.accounts.participant_token_account.to_account_info(),
                    authority: ctx.accounts.task.to_account_info(),
                },
                signer,
            ),
            reward_per_participant,
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + std::mem::size_of::<GlobalState>())]
    pub global_state: Account<'info, GlobalState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(
    social_media: String,
    engagement_type: String,
    post_url: String,
    total_token_pool: u64,
    num_participants: Option<u64>,
    deadline: i64,
    bump: u8
)]
pub struct CreateTask<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + std::mem::size_of::<Task>() + 
                32 * 100, // Allow space for up to 100 participants (adjust as needed)
        seeds = [b"task", creator.key().as_ref()],
        bump,
    )]
    pub task: Account<'info, Task>,
    
    #[account(mut)]
    pub creator: Signer<'info>,
    
    #[account(mut)]
    pub creator_token_account: Box<Account<'info, TokenAccount>>,
    
    #[account(
        init,
        payer = creator,
        token::mint = token_mint,
        token::authority = task,
    )]
    pub task_vault: Box<Account<'info, TokenAccount>>,
    
    #[account(mut)]
    pub treasury_token_account: Box<Account<'info, TokenAccount>>,
    
    pub token_mint: Box<Account<'info, Mint>>,
    
    #[account(constraint = global_state.is_initialized @ EngagementError::NotInitialized)]
    pub global_state: Account<'info, GlobalState>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct VerifyTask<'info> {
    #[account(mut)]
    pub task: Account<'info, Task>,
    #[account(mut)]
    pub participant: Signer<'info>,
    pub system_program: Program<'info, System>, // Add this line
}

#[derive(Accounts)]
pub struct Claim<'info> {
    #[account(
        mut,
        seeds = [b"task", task.creator.as_ref()],
        bump = task.bump
    )]
    pub task: Account<'info, Task>,
    
    #[account(mut)]
    pub participant: Signer<'info>,
    
    #[account(mut)]
    pub participant_token_account: Box<Account<'info, TokenAccount>>,
    
    #[account(mut)]
    pub task_vault: Box<Account<'info, TokenAccount>>,
    
    #[account(mut)]
    pub treasury_token_account: Box<Account<'info, TokenAccount>>,
    
    #[account(constraint = global_state.is_initialized @ EngagementError::NotInitialized)]
    pub global_state: Account<'info, GlobalState>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>, // Add this line
}

#[account]
pub struct GlobalState {
    pub token_mint: Pubkey, // Token mint address
    pub treasury: Pubkey,   // Treasury address
    pub treasury_cut_bps: u16, // Treasury cut in basis points (e.g., 1000 = 10%)
    pub is_initialized: bool, // Flag to check if the project is initialized
    pub owner: Pubkey,      // Owner of the program
}

#[account]
pub struct Task {
    pub social_media: String,          // Social media platform (e.g., "X" or "TikTok")
    pub engagement_type: String,       // Engagement type (e.g., "retweet", "comment")
    pub post_url: String,              // URL of the post
    pub total_token_pool: u64,         // Total tokens allocated for the task
    pub num_participants: Option<u64>, // Number of participants (optional)
    pub deadline: i64,                 // Task deadline (explicitly use i64)
    pub creator: Pubkey,               // Creator of the task
    pub proof_hash: String,            // Hash of the proof of engagement
    pub is_completed: bool,            // Whether the task is completed
    pub participants_completed: u64,   // Number of participants who completed the task
    pub participants: Vec<Pubkey>,     // List of participants who completed the task
    pub bump: u8,                      // Bump used for PDA derivation
}

#[error_code]
pub enum EngagementError {
    #[msg("The project is already initialized.")]
    AlreadyInitialized,
    #[msg("The project is not initialized.")]
    NotInitialized,
    #[msg("The task is already completed.")]
    TaskAlreadyCompleted,
    #[msg("The task is not completed.")]
    TaskNotCompleted,
    #[msg("The caller is not a participant.")]
    NotAParticipant,
    #[msg("The deadline is in the past.")]
    DeadlineInPast,
    #[msg("The deadline has already passed.")]
    DeadlinePassed,
    #[msg("Unauthorized access.")]
    Unauthorized,
}
