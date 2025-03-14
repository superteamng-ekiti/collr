/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/collr.json`.
 */
export type Collr = {
  "address": "yamX4peqmHmGM7LibiTWkoXyt7fySzVhqeKW1yhF7Zu",
  "metadata": {
    "name": "collr",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "claim",
      "discriminator": [
        62,
        198,
        214,
        193,
        213,
        159,
        108,
        210
      ],
      "accounts": [
        {
          "name": "task",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  115,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "task.creator",
                "account": "task"
              }
            ]
          }
        },
        {
          "name": "participant",
          "writable": true,
          "signer": true
        },
        {
          "name": "participantTokenAccount",
          "writable": true
        },
        {
          "name": "taskVault",
          "writable": true
        },
        {
          "name": "treasuryTokenAccount",
          "writable": true
        },
        {
          "name": "globalState"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createTask",
      "discriminator": [
        194,
        80,
        6,
        180,
        232,
        127,
        48,
        171
      ],
      "accounts": [
        {
          "name": "task",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  115,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "creatorTokenAccount",
          "writable": true
        },
        {
          "name": "taskVault",
          "writable": true,
          "signer": true
        },
        {
          "name": "treasuryTokenAccount",
          "writable": true
        },
        {
          "name": "tokenMint"
        },
        {
          "name": "globalState"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "socialMedia",
          "type": "string"
        },
        {
          "name": "engagementType",
          "type": "string"
        },
        {
          "name": "postUrl",
          "type": "string"
        },
        {
          "name": "totalTokenPool",
          "type": "u64"
        },
        {
          "name": "numParticipants",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "deadline",
          "type": "i64"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "globalState",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tokenMint",
          "type": "pubkey"
        },
        {
          "name": "treasury",
          "type": "pubkey"
        },
        {
          "name": "treasuryCutBps",
          "type": "u16"
        }
      ]
    },
    {
      "name": "verifyTask",
      "discriminator": [
        175,
        152,
        172,
        204,
        64,
        126,
        201,
        206
      ],
      "accounts": [
        {
          "name": "task",
          "writable": true
        },
        {
          "name": "participant",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "proofHash",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "globalState",
      "discriminator": [
        163,
        46,
        74,
        168,
        216,
        123,
        133,
        98
      ]
    },
    {
      "name": "task",
      "discriminator": [
        79,
        34,
        229,
        55,
        88,
        90,
        55,
        84
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "alreadyInitialized",
      "msg": "The project is already initialized."
    },
    {
      "code": 6001,
      "name": "notInitialized",
      "msg": "The project is not initialized."
    },
    {
      "code": 6002,
      "name": "taskAlreadyCompleted",
      "msg": "The task is already completed."
    },
    {
      "code": 6003,
      "name": "taskNotCompleted",
      "msg": "The task is not completed."
    },
    {
      "code": 6004,
      "name": "notAParticipant",
      "msg": "The caller is not a participant."
    },
    {
      "code": 6005,
      "name": "deadlineInPast",
      "msg": "The deadline is in the past."
    },
    {
      "code": 6006,
      "name": "deadlinePassed",
      "msg": "The deadline has already passed."
    },
    {
      "code": 6007,
      "name": "unauthorized",
      "msg": "Unauthorized access."
    }
  ],
  "types": [
    {
      "name": "globalState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "type": "pubkey"
          },
          {
            "name": "treasuryCutBps",
            "type": "u16"
          },
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "owner",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "task",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "socialMedia",
            "type": "string"
          },
          {
            "name": "engagementType",
            "type": "string"
          },
          {
            "name": "postUrl",
            "type": "string"
          },
          {
            "name": "totalTokenPool",
            "type": "u64"
          },
          {
            "name": "numParticipants",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "deadline",
            "type": "i64"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "proofHash",
            "type": "string"
          },
          {
            "name": "isCompleted",
            "type": "bool"
          },
          {
            "name": "participantsCompleted",
            "type": "u64"
          },
          {
            "name": "participants",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
