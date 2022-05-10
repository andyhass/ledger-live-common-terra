import { getEnv } from "../../../env";
import { CosmosAPI } from "../../cosmos/api/Cosmos";

const defaultEndpoint = getEnv("API_LUNA_NODE").replace(/\/$/, "");

export const lunaAPI = new CosmosAPI({ defaultEndpoint });
