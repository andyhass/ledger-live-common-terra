import { makeSync, makeScanAccounts } from "../../bridge/jsHelpers";
import { CosmosAccount } from "../cosmos/js-synchronisation";
import { lunaAPI } from "./api/sdk";

const account = new CosmosAccount({ api: lunaAPI });

export const scanAccounts = makeScanAccounts({
  getAccountShape: account.getAccountShape,
});

export const sync = makeSync({ getAccountShape: account.getAccountShape });
