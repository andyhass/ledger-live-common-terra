import type { Resolver } from "../../hw/getAddress/types";
import Luna from "./hw-app-luna";

const resolver: Resolver = async (transport, { path, verify }) => {
  const luna = new Luna(transport);
  const r = await luna.getAddress(path, verify);

  return {
    address: r.address,
    publicKey: r.publicKey,
    path,
  };
};

export default resolver;
