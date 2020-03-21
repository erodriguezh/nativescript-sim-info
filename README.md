# nativescript-sim-info

NativeScript-Sim-Info is a plugin for NativeScript which generates Qr code images.

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

| Property              | Platform | Default      | Description                                                                                                             |
|-----------------------|----------|--------------|-------------------------------------------------------------------------------------------------------------------------|
| isoCountryCode        | common   | Empty string | Returns the ISO-3166 country code equivalent for the SIM provider's country code.                                       |
| carrierName           | common   |              | Returns the MCC+MNC (mobile country code + mobile network code) of the provider of the SIM. 5 or 6 decimal digits.      |
| mcc                   | common   |              | Returns the mobile country code (MCC).                                                                                  |
| mnc                   | common   |              | Returns the mobile network code (MNC).                                                                                  |
| simOperator           | android  |              | Returns the Service Provider Name (SPN).                                                                                |
| callState             | android  |              | Returns the state of all calls on the device.                                                                           |
| dataActivity          | android  |              | Returns a constant indicating the type of activity on a data connection (cellular).                                     |
| networkType           | android  |              | Returns a constant indicating the radio technology (network type) currently in use on the device for data transmission. |
| phoneType             | android  |              | Returns a constant indicating the device phone type.                                                                    |
| simState              | android  |              | Returns a constant indicating the state of the default SIM card.                                                        |
| isNetworkRoaming      | android  |              | Returns true if the device is considered roaming on the current network, for GSM purposes.                              |
| phoneNumber           | android  |              | Returns the phone number string for line 1, for example, the MSISDN for a GSM phone. Returns null if it is unavailable. |
| deviceImei            | android  |              | returns IMEI for GSM                                                                                                    |
| deviceSoftwareVersion | android  |              | Returns the software version number for the device, for example, the IMEI/SV for GSM phones.                            |
| simSerialNumber       | android  |              | Returns the serial number of the SIM, if applicable.                                                                    |
| subscriberId          | android  |              | Returns the unique subscriber ID, for example, the IMSI for a GSM phone.                                                |
| allowsVOIP            | ios      |              | Indicates if the carrier allows making VoIP calls on its network.                                                       |

## Acknowledgements

This plugin is based on the [Nativescript-Telephony](https://github.com/roblav96/nativescript-telephony) and uses the following dependencies:

**NativeScript-Permissions:** [https://github.com/NathanaelA/nativescript-permissions](https://github.com/NathanaelA/nativescript-permissions)<br />
