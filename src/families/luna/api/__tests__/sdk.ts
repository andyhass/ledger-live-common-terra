/* eslint-disable no-console */
import * as sdk from "../sdk";

jest.mock("../../../../bridge/jsHelpers", () => ({
  makeScanAccounts: jest.fn(),
  makeSync: jest.fn(),
  makeAccountBridgeReceive: jest.fn(),
}));

describe("Luna SDK Test", () => {
  test("getAccount()", async () => {
    const account = await sdk.getAccount(
      "terra1kjls7tgllpwj3qjk6dt9jdj9cv3923rt2rs0eh"
    );
    console.log(account);
  });

  test("getBalance()", async () => {
    const balance = await sdk.getAllBalances(
      "terra1kjls7tgllpwj3qjk6dt9jdj9cv3923rt2rs0eh"
    );
    console.log(balance);
  });

  test.only("getOperations()", async () => {
    const balance = await sdk.getOperations(
      "terra1kjls7tgllpwj3qjk6dt9jdj9cv3923rt2rs0eh",
      {
        index: 0,
        derivationMode: "luna",
        derivationPath: "5/5/5",
        address: "terra1kjls7tgllpwj3qjk6dt9jdj9cv3923rt2rs0eh",
        currency: {
          type: "CryptoCurrency",
          id: "luna",
          coinType: 330,
          name: "Luna",
          managerAppName: "Terra",
          ticker: "LUNA",
          scheme: "luna",
          color: "#F9D85E",
          family: "luna",
          units: [
            {
              name: "Luna",
              code: "LUNA",
              magnitude: 6,
            },
            {
              name: "microLuna",
              code: "uluna",
              magnitude: 0,
            },
          ],
          explorerViews: [
            {
              address: "https://terrasco.pe/mainnet/address/$address",
              tx: "https://terrasco.pe/mainnet/tx/$hash",
            },
            {
              address: "https://finder.terra.money/mainnet/address/$address",
              tx: "https://finder.terra.money/mainnet/tx/$hash",
            },
          ],
        },
      }
    );
    console.log(balance);
  });

  test("getTransactions()", async () => {
    const balance = await sdk.getTransactions(
      "terra1kjls7tgllpwj3qjk6dt9jdj9cv3923rt2rs0eh"
    );
    console.log(JSON.stringify(balance));
  });
});
