// @flow

import React from "react";
import { Trans } from "react-i18next";
import { Observable, from, throwError, timer } from "rxjs";
import { map, retryWhen, mergeMap, first } from "rxjs/operators";
import type { CryptoCurrency, Account } from "@ledgerhq/live-common/lib/types";
import getAddress from "@ledgerhq/live-common/lib/hw/getAddress";
import {
  WrongDeviceForAccount,
  CantOpenDevice,
  UpdateYourApp,
} from "@ledgerhq/live-common/lib/errors";
import {
  getDerivationScheme,
  runDerivationScheme,
} from "@ledgerhq/live-common/lib/derivation";
import { withDevice } from "../../logic/hw/withDevice";
import colors, { rgba } from "../../colors";
import BluetoothScanning from "../BluetoothScanning";
import DeviceNanoAction from "../DeviceNanoAction";
import Button from "../Button";
import CurrencyIcon from "../CurrencyIcon";
import Rounded from "../Rounded";
import LText from "../LText";
import getDeviceInfo from "../../logic/hw/getDeviceInfo";
import doGenuineCheck from "../../logic/hw/theRealGenuineCheck";
import { rejectionOp } from "../DebugRejectSwitch";
import { deviceNames } from "../../wording";

import type { Step } from "./types";
import { RenderStep } from "./StepRenders";

const genericCanRetryOnError = err => {
  if (err instanceof WrongDeviceForAccount) return false;
  if (err instanceof CantOpenDevice) return false;
  if (err instanceof UpdateYourApp) return false;
  return true;
};

const retryWhileErrors = (
  acceptError: Error => boolean = genericCanRetryOnError,
) => (attempts: Observable<any>): Observable<any> =>
  attempts.pipe(
    mergeMap(error => {
      if (!acceptError(error)) {
        return throwError(error);
      }
      return timer(200);
    }),
  );

export const connectingStep: Step = {
  Body: ({ deviceName }: *) => (
    <RenderStep
      icon={<BluetoothScanning isAnimated />}
      title={
        <Trans
          i18nKey="SelectDevice.steps.connecting.title"
          values={{ deviceName }}
        />
      }
      description={
        <Trans i18nKey="SelectDevice.steps.connecting.description" />
      }
    />
  ),
  run: deviceId =>
    withDevice(deviceId)(() => from([{}])).pipe(
      rejectionOp(() => new CantOpenDevice()),
    ),
};

// TODO genuine step

export const dashboard: Step = {
  Body: () => (
    <RenderStep
      icon={<DeviceNanoAction screen="home" />}
      title={
        <Trans
          i18nKey="SelectDevice.steps.dashboard.title"
          values={deviceNames.nanoX}
        />
      }
    />
  ),
  run: (deviceId, meta) =>
    withDevice(deviceId)(transport => from(getDeviceInfo(transport)))
      .pipe(retryWhen(retryWhileErrors()))
      .pipe(
        map(deviceInfo => ({
          ...meta,
          deviceInfo,
        })),
        rejectionOp(() => new CantOpenDevice()),
      ),
};

export const genuineCheck: Step = {
  Body: () => (
    <RenderStep
      icon={<DeviceNanoAction screen="validation" action />}
      title={
        <Trans
          i18nKey="SelectDevice.steps.genuineCheck.title"
          values={deviceNames.nanoX}
        />
      }
    />
  ),
  run: (deviceId, meta) =>
    withDevice(deviceId)(transport =>
      doGenuineCheck(transport, meta.deviceInfo),
    ).pipe(
      map(genuineResult => ({
        ...meta,
        genuineResult,
      })),
    ),
};

export const currencyApp: CryptoCurrency => Step = currency => ({
  Body: () => (
    <RenderStep
      icon={
        <Rounded bg={rgba(currency.color, 0.1)}>
          <CurrencyIcon currency={currency} size={32} />
        </Rounded>
      }
      title={
        <Trans
          i18nKey="SelectDevice.steps.currencyApp.title"
          values={{
            managerAppName: currency.managerAppName,
            currencyName: currency.name,
          }}
        />
      }
      description={
        <Trans
          i18nKey="SelectDevice.steps.currencyApp.description"
          values={{
            managerAppName: currency.managerAppName,
            currencyName: currency.name,
          }}
        />
      }
    />
  ),
  run: (deviceId, meta) =>
    withDevice(deviceId)(transport =>
      from(
        getAddress(
          transport,
          currency,
          runDerivationScheme(
            getDerivationScheme({ currency, derivationMode: "" }),
            currency,
          ),
        ),
      ),
    )
      .pipe(retryWhen(retryWhileErrors()))
      .pipe(
        map(addressInfo => ({
          ...meta,
          addressInfo,
        })),
        rejectionOp(() => new CantOpenDevice()),
      ),
});

export const accountApp: Account => Step = account => ({
  Body: () => (
    <RenderStep
      icon={
        <Rounded bg={rgba(account.currency.color, 0.1)}>
          <CurrencyIcon currency={account.currency} size={32} />
        </Rounded>
      }
      title={
        <Trans
          i18nKey="SelectDevice.steps.accountApp.title"
          values={{
            managerAppName: account.currency.managerAppName,
            currencyName: account.currency.name,
            accountName: account.name,
          }}
        />
      }
      description={
        <Trans
          i18nKey="SelectDevice.steps.accountApp.description"
          values={{
            managerAppName: account.currency.managerAppName,
            currencyName: account.currency.name,
            accountName: account.name,
          }}
        />
      }
    />
  ),
  run: (deviceId, meta) =>
    withDevice(deviceId)(transport =>
      from(
        getAddress(transport, account.currency, account.freshAddressPath).then(
          addressInfo => {
            if (addressInfo.address !== account.freshAddress) {
              throw new WrongDeviceForAccount("WrongDeviceForAccount", {
                accountName: account.name,
              });
            }
            return {
              ...meta,
              addressInfo,
            };
          },
        ),
      ),
    ).pipe(
      retryWhen(retryWhileErrors()),
      rejectionOp(
        () => new WrongDeviceForAccount("", { accountName: account.name }),
      ),
    ),
});

export const receiveVerifyStep: Account => Step = account => ({
  Body: ({ onDone }: *) => (
    <RenderStep
      icon={<DeviceNanoAction width={240} screen="validation" />}
      title={
        <Trans
          i18nKey="SelectDevice.steps.receiveVerify.title"
          values={{
            currencyName: account.currency.name,
            accountName: account.name,
          }}
        />
      }
      description={
        <Trans
          i18nKey="SelectDevice.steps.receiveVerify.description"
          values={{
            currencyName: account.currency.name,
            accountName: account.name,
          }}
        >
          A {account.currency.name} address
          <LText semiBold style={{ color: colors.darkBlue }}>
            will be displayed
          </LText>{" "}
          on your device. Carefully verify that it matches the address on your
          phone.
        </Trans>
      }
    >
      <Button
        type="primary"
        onPress={onDone}
        title={<Trans i18nKey="SelectDevice.steps.receiveVerify.action" />}
      />
    </RenderStep>
  ),
  // pass as soon as you tap onDone
  run: (deviceId, meta, onDoneO) =>
    onDoneO.pipe(
      map(() => meta),
      first(),
    ),
});
