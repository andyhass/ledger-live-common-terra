import { getEnv } from "../../../env";
import network from "../../../network";
import { CosmosAPI } from "../../cosmos/api/Cosmos";

const nodeEndpoint = getEnv("API_LUNA_NODE").replace(/\/$/, "");
const indexerEndpoint = getEnv("API_LUNA_NODE").replace(/\/$/, ""); // getEnv("API_LUNA_INDEXER").replace(/\/$/, "");

export class LunaAPI extends CosmosAPI {
  protected _defaultEndpoint: string = nodeEndpoint;

  getTransactions = async (address: string): Promise<any> => {
    const receive = await network({
      method: "GET",
      url:
        `${indexerEndpoint}/cosmos/tx/v1beta1/txs?events=` +
        encodeURI(`transfer.recipient='${address}'`),
    });

    const send = await network({
      method: "GET",
      url:
        `${indexerEndpoint}/cosmos/tx/v1beta1/txs?events=` +
        encodeURI(`message.sender='${address}'`),
    });

    return [...receive.data.tx_responses, ...send.data.tx_responses];
  };
}

export const lunaAPI = new LunaAPI();
