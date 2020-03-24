# nativescript-sim-info

NativeScript-Sim-Info is a plugin for NativeScript which allows access to the sim card information.

## Installation

Go to your app's root folder and execute:

```javascript
tns plugin add nativescript-sim-info
```

## Usage

```typescript
    import { SimInfo } from "nativescript-sim-info";

    load(): void {
        const simInfo = new SimInfo();
        simInfo.getData()
            .then((simData) => {
                console.log(simData)
            }).catch((error) => {
                console.error(error);
            });
    }
```

## API

| Property              | Platform | Type                   | Description                                                                                                             |
|-----------------------|----------|------------------------|-------------------------------------------------------------------------------------------------------------------------|
| isoCountryCode        | common   | string                 | Returns the ISO-3166 country code equivalent for the SIM provider's country code.                                       |
| carrierName           | common   | string                 | Returns the MCC+MNC (mobile country code + mobile network code) of the provider of the SIM. 5 or 6 decimal digits.      |
| mcc                   | common   | string - number - null | Returns the mobile country code (MCC).                                                                                  |
| mnc                   | common   | string - number - null | Returns the mobile network code (MNC).                                                                                  |
| simOperator           | android  | string                 | Returns the Service Provider Name (SPN).                                                                                |
| callState             | android  | number - null          | Returns the state of all calls on the device.                                                                           |
| dataActivity          | android  | number - null          | Returns a constant indicating the type of activity on a data connection (cellular).                                     |
| networkType           | android  | number - null          | Returns a constant indicating the radio technology (network type) currently in use on the device for data transmission. |
| phoneType             | android  | number - null          | Returns a constant indicating the device phone type.                                                                    |
| simState              | android  | number - null          | Returns a constant indicating the state of the default SIM card.                                                        |
| isNetworkRoaming      | android  | boolean - null         | Returns true if the device is considered roaming on the current network, for GSM purposes.                              |
| phoneNumber           | android  | string                 | Returns the phone number string for line 1, for example, the MSISDN for a GSM phone. Returns null if it is unavailable. |
| deviceImei            | android  | string                 | returns IMEI for GSM.                                                                                                   |
| deviceMeid            | android  | string                 | returns MEID for CDMA.                                                                                                  |
| deviceSoftwareVersion | android  | string                 | Returns the software version number for the device, for example, the IMEI/SV for GSM phones.                            |
| simSerialNumber       | android  | string                 | Returns the serial number of the SIM, if applicable.                                                                    |
| subscriberId          | android  | string                 | Returns the unique subscriber ID, for example, the IMSI for a GSM phone.                                                |
| subscriptionId        | android  | number - null          | Returns the subscription ID.                                                                                            |
| isDefaultSim          | android  | boolean - null         | Returns true if the sim is considered the default one.                                                                  |
| simId                 | android  | number - null          | Returns the card ID of the SIM. Added in API level 29.                                                                  |
| carrierId             | android  | number - null          | Returns the carrier ID of the SIM. Added in API level 29.                                                               |
| allowsVOIP            | ios      | boolean - null         | Indicates if the carrier allows making VoIP calls on its network.                                                       |

### Android

#### Dual-Sim Support

From Api Level 22, A.K.A LOLLIPOP_MR1 or Android 5.1, there is support for dual sim. I would like to point out that there is a difference in number of information attributes between what Android considers the default sim and the secondaries.

### iOS

#### Dual-Sim Support

From iOS 12 on, Apple supports dual sim. The available information attributes are the same for the default and secondary sim.
*At the moment, I could not test how is the support for e-sim cards. I would appreciate if anyone is able to test it and let me know*

#### Phone Number

Apple does not allow the access to the phone number under any circumstance. More information on this topic can be found under the point 2.5.2 of the [guidelines](https://developer.apple.com/app-store/review/guidelines/#software-requirements).

## Acknowledgements

This plugin is based on the [Nativescript-Telephony](https://github.com/roblav96/nativescript-telephony) and uses the following dependencies:

**NativeScript-Permissions:** [https://github.com/NathanaelA/nativescript-permissions](https://github.com/NathanaelA/nativescript-permissions)<br />
