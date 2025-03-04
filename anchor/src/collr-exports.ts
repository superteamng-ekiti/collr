// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import CollrIDL from '../target/idl/collr.json'
import type { Collr } from '../target/types/collr'

// Re-export the generated IDL and type
export { Collr, CollrIDL }

// The programId is imported from the program IDL.
export const COLLR_PROGRAM_ID = new PublicKey(CollrIDL.address)

// This is a helper function to get the Collr Anchor program.
export function getCollrProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...CollrIDL, address: address ? address.toBase58() : CollrIDL.address } as Collr, provider)
}

// This is a helper function to get the program ID for the Collr program depending on the cluster.
export function getCollrProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Collr program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return COLLR_PROGRAM_ID
  }
}
