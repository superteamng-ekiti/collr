import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { Collr } from '../target/types/collr'

describe('collr', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Collr as Program<Collr>

  const collrKeypair = Keypair.generate()

  it('Initialize Collr', async () => {
    await program.methods
      .initialize()
      .accounts({
        collr: collrKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([collrKeypair])
      .rpc()

    const currentCount = await program.account.collr.fetch(collrKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Collr', async () => {
    await program.methods.increment().accounts({ collr: collrKeypair.publicKey }).rpc()

    const currentCount = await program.account.collr.fetch(collrKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Collr Again', async () => {
    await program.methods.increment().accounts({ collr: collrKeypair.publicKey }).rpc()

    const currentCount = await program.account.collr.fetch(collrKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Collr', async () => {
    await program.methods.decrement().accounts({ collr: collrKeypair.publicKey }).rpc()

    const currentCount = await program.account.collr.fetch(collrKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set collr value', async () => {
    await program.methods.set(42).accounts({ collr: collrKeypair.publicKey }).rpc()

    const currentCount = await program.account.collr.fetch(collrKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the collr account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        collr: collrKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.collr.fetchNullable(collrKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
