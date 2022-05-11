import { ManagerDeviceLockedError } from "@ledgerhq/errors";
import type Transport from "@ledgerhq/hw-transport";
import TerraApp from "@terra-money/ledger-terra-js";
import { parseDerivationPathStringToArray } from "./logic";

export default class Luna {
  terraApp: TerraApp;

  constructor(transport: Transport) {
    this.terraApp = new TerraApp(transport);
    // this.terraApp.initialize();
  }

  async getAddress(
    path: string,
    verify: boolean
  ): Promise<{
    publicKey: string;
    address: string;
  }> {
    await this.terraApp.initialize();
    const version = this.terraApp.getVersion();

    if (version.device_locked) {
      throw new ManagerDeviceLockedError();
    }

    const addressAndPubKey = verify
      ? await this.terraApp.showAddressAndPubKey(
          parseDerivationPathStringToArray(path),
          "terra"
        )
      : await this.terraApp.getAddressAndPubKey(
          parseDerivationPathStringToArray(path),
          "terra"
        );

    // console.log(`addressAndPubKey: ${JSON.stringify(addressAndPubKey)}`);
    // if (response.return_code !== 0x9000) {
    //   throw new Error(
    //     `Error [${response.return_code}] ${response.error_message}`
    //   );
    // }

    // if (message === "DisconnectedDevice") {
    // throw new DisconnectedDevice();
    // }

    // if (statusText === "CONDITIONS_OF_USE_NOT_SATISFIED") {
    //   throw new UserRefusedAddress();
    // }

    return {
      address: addressAndPubKey.bech32_address,
      publicKey: "",
    };
  }

  //   async signTransaction(
  //     unsignedTransaction: SignTransactionArgs
  //   ): Promise<string> {
  //     const { signature, returnCode, statusText } =
  //       await this.terraApp.signTransaction(unsignedTransaction);

  //     if (returnCode !== "9000") {
  //       throw new TransportError(statusText, returnCode);
  //     }

  //     return signature;
  //   }
}
