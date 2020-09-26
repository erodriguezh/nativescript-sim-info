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

### Android Output

#### Single Sim

```json
[
    {
        "isoCountryCode": "at",
        "simOperator": "23XXX",
        "carrierName": "A1",
        "callState": null,
        "dataActivity": null,
        "phoneType": 1,
        "simState": 5,
        "isNetworkRoaming": true,
        "mcc": 232,
        "mnc": 1,
        "phoneNumber": "",
        "deviceSoftwareVersion": "01",
        "simSerialNumber": "894301561923869XXXX",
        "subscriberId": "23201163022XXXX",
        "isDefaultSim": true,
        "networkType": 13,
        "deviceImei": "35404611160XXXX",
        "deviceMeid": "",
        "subscriptionId": 1
    }
]
```

#### Dual Sim

```json
[
    {
        "isoCountryCode": "at",
        "simOperator": "23XXX",
        "carrierName": "spusu",
        "callState": null,
        "dataActivity": 4,
        "phoneType": 1,
        "simState": 5,
        "isNetworkRoaming": true,
        "mcc": 232,
        "mnc": 17,
        "phoneNumber": "+4366XXXXXXXX",
        "deviceSoftwareVersion": "00",
        "simSerialNumber": "894317008000176XXXX",
        "subscriberId": "23217004025XXXX",
        "isDefaultSim": true,
        "networkType": 13,
        "deviceImei": "86760103133XXXX",
        "deviceMeid": "9900111506XXXX",
        "subscriptionId": 1
    },
    {
        "isoCountryCode": "at",
        "carrierName": "A1",
        "isNetworkRoaming": true,
        "phoneNumber": "+4366XXXXXXX",
        "mcc": 232,
        "mnc": 1,
        "subscriptionId": 4,
        "simSerialNumber": "894301561520280XXXX",
        "isDefaultSim": false
    }
]
```

<details>
<summary>Possible errors</summary>

The plugin will request more or less permission items depending on the Android version. If any of the permissions are rejected by the user, an object will be returned as a rejected promise.

```json
{
    "android.permission.READ_PHONE_STATE": false,
    "android.permission.READ_SMS": false,
    "android.permission.READ_PHONE_NUMBERS": false,
}
```
</details>

### iOS Output

#### Single Sim

```json
[
    {
        "mnc": "232",
        "isoCountryCode": "at",
        "carrierName": "A1",
        "allowsVOIP": true,
        "mcc": "1"
    }
]
```

## API

| Property              | Platform | Android Version | iOS Version | Type                   | Description                                                                                                             |
|-----------------------|----------|-----------------|-------------|------------------------|-------------------------------------------------------------------------------------------------------------------------|
| isoCountryCode        | common   | 1               | 1           | string                 | Returns the ISO-3166 country code equivalent for the SIM provider's country code.                                       |
| carrierName           | common   | 1               | 1           | string                 | Returns the MCC+MNC (mobile country code + mobile network code) of the provider of the SIM. 5 or 6 decimal digits.      |
| mcc                   | common   | 1               | 1           | string - number - null | Returns the mobile country code (MCC).                                                                                  |
| mnc                   | common   | 1               | 1           | string - number - null | Returns the mobile network code (MNC).                                                                                  |
| simOperator           | android  | 1               | -           | string                 | Returns the Service Provider Name (SPN).                                                                                |
| callState             | android  | 1               | -           | number - null          | Returns the state of all calls on the device.                                                                           |
| dataActivity          | android  | 1               | -           | number - null          | Returns a constant indicating the type of activity on a data connection (cellular).                                     |
| phoneType             | android  | 1               | -           | number - null          | Returns a constant indicating the device phone type.                                                                    |
| simState              | android  | 1               | -           | number - null          | Returns a constant indicating the state of the default SIM card.                                                        |
| isNetworkRoaming      | android  | 1               | -           | boolean - null         | Returns true if the device is considered roaming on the current network, for GSM purposes.                              |
| phoneNumber           | android  | 1               | -           | string                 | Returns the phone number string for line 1, for example, the MSISDN for a GSM phone. Returns null if it is unavailable. |
| deviceSoftwareVersion | android  | 1               | -           | string                 | Returns the software version number for the device, for example, the IMEI/SV for GSM phones.                            |
| simSerialNumber       | android  | 1               | -           | string                 | Returns the serial number of the SIM, if applicable.                                                                    |
| subscriberId          | android  | 1               | -           | string                 | Returns the unique subscriber ID, for example, the IMSI for a GSM phone.                                                |
| subscriptionId        | android  | 5.1 (Api: 22)   | -           | number - null          | Returns the subscription.                                                                                               |
| simSerialNumber       | android  | 5.1 (Api: 22)   | -           | string                 | Returns SIM unique serial number (ICCID).                                                                               |
| networkType           | android  | 7 (Api: 24)     | -           | number - null          | Returns a constant indicating the radio technology (network type) currently in use on the device for data transmission. |
| deviceImei            | android  | 8 (Api: 26)     | -           | string                 | returns IMEI for GSM.                                                                                                   |
| isDefaultSim          | android  | -               | -           | boolean - null         | Returns true if the sim is considered the default.                                                                      |
| allowsVOIP            | ios      | -               | 1           | boolean - null         | Indicates if the carrier allows making VoIP calls on its network.                                                       |                                                      |

### Android

#### Dual-Sim Support

From Api Level 22, A.K.A LOLLIPOP_MR1 or Android 5.1, there is support for dual sim. I would like to point out that there is a difference in number of information attributes between what Android considers the default subscription (TelephonyManager) and the subscriptions (SubscriptionManager).

### iOS

#### Dual-Sim Support

From iOS 12 on, Apple supports dual sim. The available information attributes are the same for the default and secondary sim.
*At the moment, I could not test how is the support for e-sim cards. I would appreciate if anyone is able to test it and let me know*

#### Phone Number

Apple does not allow the access to the phone number under any circumstance. More information on this topic can be found under the point 2.5.2 of the [guidelines](https://developer.apple.com/app-store/review/guidelines/#software-requirements).

## Acknowledgements

This plugin is based on the [Nativescript-Telephony](https://github.com/roblav96/nativescript-telephony) and uses the following dependencies:

**NativeScript-Permissions:** [https://github.com/NathanaelA/nativescript-permissions](https://github.com/NathanaelA/nativescript-permissions)<br />
