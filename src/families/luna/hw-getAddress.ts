import type { Resolver } from "../../hw/getAddress/types";
import Luna from "./hw-app-luna";

const resolver: Resolver = async (
  transport,
  { path /*, verify, currency */ } // TODO is verify and currency needed?
) => {
  const cosmos = new Luna(transport);
  const r = await cosmos.getAddress(path);

  return {
    address: r.address,
    publicKey: r.publicKey,
    path,
  };
};

export default resolver;
