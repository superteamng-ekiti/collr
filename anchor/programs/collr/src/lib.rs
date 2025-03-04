#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod collr {
    use super::*;

  pub fn close(_ctx: Context<CloseCollr>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.collr.count = ctx.accounts.collr.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.collr.count = ctx.accounts.collr.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeCollr>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.collr.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeCollr<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Collr::INIT_SPACE,
  payer = payer
  )]
  pub collr: Account<'info, Collr>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseCollr<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub collr: Account<'info, Collr>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub collr: Account<'info, Collr>,
}

#[account]
#[derive(InitSpace)]
pub struct Collr {
  count: u8,
}
