// import type { LunaTransaction /*LunaTransactionRaw*/ } from "./types";
// import { BigNumber } from "bignumber.js";
// import {
//   fromTransactionCommonRaw,
//   toTransactionCommonRaw,
// } from "../../transaction/common";
// import type { Account } from "../../types";
// import { getAccountUnit } from "../../account";
// import { formatCurrencyUnit } from "../../currencies";
import {
  fromTransactionRaw as fromCosmosTransactionRaw,
  toTransactionRaw as toCosmosTransactionRaw,
  formatTransaction as formatCosmosTransaction,
} from "../cosmos/transaction";

// export const formatTransaction = (
//   { mode, amount, recipient, useAllAmount }: LunaTransaction,
//   account: Account
// ): string =>
//   `
// ${mode.toUpperCase()} ${
//     useAllAmount
//       ? "MAX"
//       : amount.isZero()
//       ? ""
//       : " " +
//         formatCurrencyUnit(getAccountUnit(account), amount, {
//           showCode: true,
//           disableRounding: true,
//         })
//   }${recipient ? `\nTO ${recipient}` : ""}`;

export const formatTransaction = formatCosmosTransaction;

export const fromTransactionRaw = fromCosmosTransactionRaw;

export const toTransactionRaw = toCosmosTransactionRaw;

export default { formatTransaction, fromTransactionRaw, toTransactionRaw };
