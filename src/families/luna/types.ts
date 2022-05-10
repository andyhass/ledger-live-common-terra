import type { BigNumber } from "bignumber.js";
import type {
  TransactionCommon,
  // TransactionCommonRaw,
} from "../../types/transaction";

// export type NetworkInfo = {
//   family: "luna";
// };
// export type NetworkInfoRaw = {
//   family: "luna";
// };

// /**
//  * Luna account resources
//  */
// export type LunaResources = {
//   nonce: number;
//   additionalBalance: BigNumber;
// };

// /**
//  * Luna account resources from raw JSON
//  */
// export type LunaResourcesRaw = {
//   nonce: number;
//   additionalBalance: string;
// };
export type NetworkInfo = {
  family: "luna";
  fees: BigNumber;
};
// export type NetworkInfoRaw = {
//   family: "luna";
//   fees: string;
// };

export type Transaction = TransactionCommon & {
  family: "luna";
  mode: string;
  networkInfo: NetworkInfo | null | undefined;
  fees: BigNumber | null | undefined;
  gas: BigNumber | null | undefined;
  memo: string | null | undefined;
  // add here all transaction-specific fields if you implement other modes than "send"
};

// export type TransactionRaw = TransactionCommonRaw & {
//   family: "luna";
//   mode: string;
//   networkInfo: NetworkInfoRaw | null | undefined;
//   fees: string | null | undefined;
//   gas: string | null | undefined;
//   memo: string | null | undefined;
// };

// export type StatusErrorMap = {
//   recipient?: Error;
//   amount?: Error;
//   fees?: Error;
//   validators?: Error;
//   delegate?: Error;
//   redelegation?: Error;
//   unbonding?: Error;
//   claimReward?: Error;
//   feeTooHigh?: Error;
// };

// export type TransactionStatus = {
//   errors: StatusErrorMap;
//   warnings: StatusErrorMap;
//   estimatedFees: BigNumber;
//   amount: BigNumber;
//   totalSpent: BigNumber;
// };

// export type CoreStatics = Record<any, any>;
// export type CoreAccountSpecifics = Record<any, any>;
// export type CoreOperationSpecifics = Record<any, any>;
// export type CoreCurrencySpecifics = Record<any, any>;

// export const reflect = (_declare: any) => {};

/**
 * MyCoin currency data that will be preloaded.
 * You can for instance add a list of validators for Proof-of-Stake blockchains,
 * or any volatile data that could not be set as constants in the code (staking progress, fee estimation variables, etc.)
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type LunaPreloadData = {
  somePreloadedData: Record<any, any>;
};
