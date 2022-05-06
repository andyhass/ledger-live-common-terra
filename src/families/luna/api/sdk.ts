import { GetAccountShapeArg0 } from "../../../bridge/jsHelpers";
import { getEnv } from "../../../env";
import { Operation } from "../../../types";
import {
  getAccount as getCosmosAccount,
  getAllBalances as getCosmosAllBalances,
  getTransactions as getCosmosTransactions,
} from "../../cosmos/api/Cosmos";
import { txToOps } from "../../cosmos/js-synchronisation";

const defaultEndpoint = getEnv("API_LUNA_NODE").replace(/\/$/, "");

export const getAccount = (
  address: string
): ReturnType<typeof getCosmosAccount> =>
  getCosmosAccount(address, { defaultEndpoint });

export const getAllBalances = (
  address: string
): ReturnType<typeof getCosmosAllBalances> =>
  getCosmosAllBalances(address, { defaultEndpoint });

export const getTransactions = (
  address: string
): ReturnType<typeof getCosmosTransactions> =>
  getCosmosTransactions(address, { defaultEndpoint });

export const getOperations = async (
  address: string,
  info: GetAccountShapeArg0
): Promise<Operation[]> => {
  const transactions = await getTransactions(address);
  const operations = txToOps(info, "xyz", transactions);

  return operations;
};
export const getPreloadedData = (): void => {
  throw new Error("Not implemented");
};
export const getFees = (): void => {
  throw new Error("Not implemented");
};
export const submit = (): void => {
  throw new Error("Not implemented");
};
export const disconnect = (): void => {
  throw new Error("Not implemented");
};
