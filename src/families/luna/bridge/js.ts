import type {
  AccountBridge,
  CryptoCurrency,
  CurrencyBridge,
} from "../../../types";
import type { Transaction } from "../types";
import { makeAccountBridgeReceive } from "../../../bridge/jsHelpers";

import { sync, scanAccounts } from "../js-synchronisation";

const receive = makeAccountBridgeReceive();

const getPreloadStrategy = (_currency) => ({
  preloadMaxAge: 30 * 1000,
});

const currencyBridge: CurrencyBridge = {
  getPreloadStrategy,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  preload: async (currency: CryptoCurrency) => {
    // const validators = await getValidators(currency);
    // setCosmosPreloadData({
    //   validators,
    // });
    return Promise.resolve({});
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hydrate: (data: unknown) => {
    return;
  },
  scanAccounts,
};

const createTransaction = () => {
  throw new Error("createTransaction not implemented");
};

const prepareTransaction = () => {
  throw new Error("prepareTransaction not implemented");
};

const updateTransaction = () => {
  throw new Error("updateTransaction not implemented");
};

const getTransactionStatus = () => {
  throw new Error("getTransactionStatus not implemented");
};

const estimateMaxSpendable = () => {
  throw new Error("estimateMaxSpendable not implemented");
};

const signOperation = () => {
  throw new Error("signOperation not implemented");
};

const broadcast = () => {
  throw new Error("broadcast not implemented");
};

const accountBridge: AccountBridge<Transaction> = {
  estimateMaxSpendable,
  createTransaction,
  updateTransaction,
  getTransactionStatus,
  prepareTransaction,
  sync,
  receive,
  signOperation,
  broadcast,
};

export default { currencyBridge, accountBridge };
