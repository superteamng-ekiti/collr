import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Collr } from '../target/types/collr';
import { PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { assert } from 'chai';

describe('collr', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Collr as Program<Collr>;

  it('initializes the project', async () => {
    // Generate new keypair for global state
    const globalState = anchor.web3.Keypair.generate();

    // Create test token mint
    const tokenMint = anchor.web3.Keypair.generate();
    const treasury = anchor.web3.Keypair.generate();
    const treasuryCutBps = 1000; // 10%

    // Initialize the project
    await program.methods.initialize(
      tokenMint.publicKey,
      treasury.publicKey,
      treasuryCutBps
    )
    .accounts({
      globalState: globalState.publicKey,
      authority: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([globalState])
    .rpc();

    // Fetch the initialized global state
    const state = await program.account.globalState.fetch(globalState.publicKey);

    // Verify initialization
    assert.ok(state.isInitialized);
    assert.equal(state.tokenMint.toString(), tokenMint.publicKey.toString());
    assert.equal(state.treasury.toString(), treasury.publicKey.toString());
    assert.equal(state.treasuryCutBps, treasuryCutBps);
    assert.equal(state.owner.toString(), provider.wallet.publicKey.toString());
  });
});
