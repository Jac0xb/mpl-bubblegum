/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  bytes,
  mapSerializer,
  struct,
  u32,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { resolveCreatorHash, resolveDataHash } from '../../hooked';
import { findTreeConfigPda } from '../accounts';
import { PickPartial, addAccountMeta, addObjectProperty } from '../shared';
import {
  MetadataArgs,
  MetadataArgsArgs,
  getMetadataArgsSerializer,
} from '../types';

// Accounts.
export type VerifyCreatorInstructionAccounts = {
  treeConfig?: PublicKey | Pda;
  leafOwner: PublicKey | Pda;
  leafDelegate?: PublicKey | Pda;
  merkleTree: PublicKey | Pda;
  payer?: Signer;
  creator: Signer;
  logWrapper?: PublicKey | Pda;
  compressionProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type VerifyCreatorInstructionData = {
  discriminator: Array<number>;
  root: Uint8Array;
  dataHash: Uint8Array;
  creatorHash: Uint8Array;
  nonce: bigint;
  index: number;
  metadata: MetadataArgs;
};

export type VerifyCreatorInstructionDataArgs = {
  root: Uint8Array;
  dataHash: Uint8Array;
  creatorHash: Uint8Array;
  nonce: number | bigint;
  index: number;
  metadata: MetadataArgsArgs;
};

/** @deprecated Use `getVerifyCreatorInstructionDataSerializer()` without any argument instead. */
export function getVerifyCreatorInstructionDataSerializer(
  _context: object
): Serializer<VerifyCreatorInstructionDataArgs, VerifyCreatorInstructionData>;
export function getVerifyCreatorInstructionDataSerializer(): Serializer<
  VerifyCreatorInstructionDataArgs,
  VerifyCreatorInstructionData
>;
export function getVerifyCreatorInstructionDataSerializer(
  _context: object = {}
): Serializer<VerifyCreatorInstructionDataArgs, VerifyCreatorInstructionData> {
  return mapSerializer<
    VerifyCreatorInstructionDataArgs,
    any,
    VerifyCreatorInstructionData
  >(
    struct<VerifyCreatorInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['root', bytes({ size: 32 })],
        ['dataHash', bytes({ size: 32 })],
        ['creatorHash', bytes({ size: 32 })],
        ['nonce', u64()],
        ['index', u32()],
        ['metadata', getMetadataArgsSerializer()],
      ],
      { description: 'VerifyCreatorInstructionData' }
    ),
    (value) => ({ ...value, discriminator: [52, 17, 96, 132, 71, 4, 85, 194] })
  ) as Serializer<
    VerifyCreatorInstructionDataArgs,
    VerifyCreatorInstructionData
  >;
}

// Extra Args.
export type VerifyCreatorInstructionExtraArgs = { proof: Array<PublicKey> };

// Args.
export type VerifyCreatorInstructionArgs = PickPartial<
  VerifyCreatorInstructionDataArgs & VerifyCreatorInstructionExtraArgs,
  'dataHash' | 'creatorHash' | 'proof'
>;

// Instruction.
export function verifyCreator(
  context: Pick<Context, 'programs' | 'eddsa' | 'identity' | 'payer'>,
  input: VerifyCreatorInstructionAccounts & VerifyCreatorInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplBubblegum',
    'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'
  );

  // Resolved inputs.
  const resolvedAccounts = {
    leafOwner: [input.leafOwner, false] as const,
    merkleTree: [input.merkleTree, true] as const,
    creator: [input.creator, false] as const,
  };
  const resolvingArgs = {};
  addObjectProperty(
    resolvedAccounts,
    'treeConfig',
    input.treeConfig
      ? ([input.treeConfig, false] as const)
      : ([
          findTreeConfigPda(context, {
            merkleTree: publicKey(input.merkleTree, false),
          }),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'leafDelegate',
    input.leafDelegate
      ? ([input.leafDelegate, false] as const)
      : ([input.leafOwner, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'payer',
    input.payer
      ? ([input.payer, false] as const)
      : ([context.payer, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'logWrapper',
    input.logWrapper
      ? ([input.logWrapper, false] as const)
      : ([
          context.programs.getPublicKey(
            'splNoop',
            'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'compressionProgram',
    input.compressionProgram
      ? ([input.compressionProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'splAccountCompression',
            'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'systemProgram',
    input.systemProgram
      ? ([input.systemProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'splSystem',
            '11111111111111111111111111111111'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvingArgs,
    'dataHash',
    input.dataHash ??
      resolveDataHash(
        context,
        { ...input, ...resolvedAccounts },
        { ...input, ...resolvingArgs },
        programId,
        false
      )
  );
  addObjectProperty(
    resolvingArgs,
    'creatorHash',
    input.creatorHash ??
      resolveCreatorHash(
        context,
        { ...input, ...resolvedAccounts },
        { ...input, ...resolvingArgs },
        programId,
        false
      )
  );
  addObjectProperty(resolvingArgs, 'proof', input.proof ?? []);
  const resolvedArgs = { ...input, ...resolvingArgs };

  addAccountMeta(keys, signers, resolvedAccounts.treeConfig, false);
  addAccountMeta(keys, signers, resolvedAccounts.leafOwner, false);
  addAccountMeta(keys, signers, resolvedAccounts.leafDelegate, false);
  addAccountMeta(keys, signers, resolvedAccounts.merkleTree, false);
  addAccountMeta(keys, signers, resolvedAccounts.payer, false);
  addAccountMeta(keys, signers, resolvedAccounts.creator, false);
  addAccountMeta(keys, signers, resolvedAccounts.logWrapper, false);
  addAccountMeta(keys, signers, resolvedAccounts.compressionProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.systemProgram, false);

  // Remaining Accounts.
  const remainingAccounts = resolvedArgs.proof.map(
    (address) => [address, false] as const
  );
  remainingAccounts.forEach((remainingAccount) =>
    addAccountMeta(keys, signers, remainingAccount, false)
  );

  // Data.
  const data =
    getVerifyCreatorInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
