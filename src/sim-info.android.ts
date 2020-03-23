import * as applicationModule from 'tns-core-modules/application';
import * as permissions from 'nativescript-permissions';
import { SimData } from './sim-info.common';

export class SimInfo {

  permissionTypes = [];
  apiLevel: number;

  constructor() {
    this.permissionTypes = this.getPermissionTypes();
    this.apiLevel = android.os.Build.VERSION.SDK_INT;
  }

  private getPermissionTypes(): string[] {
    if (this.apiLevel <= 22) { // android.os.Build.VERSION_CODES.LOLLIPOP_MR1 - 22
      return [android.Manifest.permission.READ_PHONE_STATE];
    } else if (this.apiLevel <= 25) { // android.os.Build.VERSION_CODES.N_MR1 - 25
      return [android.Manifest.permission.READ_PHONE_STATE, android.Manifest.permission.READ_SMS];
    } else { // ApiLevel >= Oreo
      return [android.Manifest.permission.READ_PHONE_STATE, android.Manifest.permission.READ_SMS, 'android.permission.READ_PHONE_NUMBERS'];
    }
  }

  private hasPermission(): boolean {
    let hasPermission = false;

    const isPermissionTypeGranted = function(permissionType) {
      return permissions.hasPermission(permissionType);
    };

    hasPermission = this.permissionTypes.every(isPermissionTypeGranted);

    return hasPermission;
  }

  getData(): Promise<SimData | SimData[]> {
    let getData = Promise.resolve(null);

    if (!this.hasPermission()) {
      getData = permissions.requestPermissions(this.permissionTypes);
    }

    return getData.then(() => {
      const telephonyManager = applicationModule.android.context.getSystemService(android.content.Context.TELEPHONY_SERVICE);
      const telephonyManagerData = this.getDataFromTelephonyManager(telephonyManager);

      if (this.apiLevel >= 22) { // android.os.Build.VERSION_CODES.LOLLIPOP_MR1 - 22
        const subscriptionManager = applicationModule.android.context.getSystemService('telephony_subscription_service');
        const subscriberList = subscriptionManager.getActiveSubscriptionInfoList();
        const subscribersData = this.getDataFromSubscriberList(subscriberList);

        if (Array.isArray(subscribersData)) {
          for (let i = 0; i < subscribersData.length; i++) {
            if (subscribersData[i].simSerialNumber ===  telephonyManagerData.simSerialNumber) {
              subscribersData[i] = Object.assign({}, telephonyManagerData, subscribersData[i], { isDefaultSim: true });
            }
          }
        }

        return Promise.resolve(subscribersData);
      } else {
        return Promise.resolve(telephonyManagerData);
      }
    }).catch((err) => {
      return Promise.reject(err);
    });
  }

  private getDataFromSubscriberList(subscribers: any): SimData[] | SimData {
    const subscribersData = [];
    const subscribersArray = subscribers.toArray();

    for (let i = 0; i < subscribersArray.length; i++) {
      subscribersData.push(this.getDataFromSubscriber(subscribersArray[i]));
    }
    return subscribersData;
  }

  private getDataFromSubscriber(subscriber): SimData {
    let data: SimData = {
      isoCountryCode: subscriber.getCountryIso() || '',
      carrierName: subscriber.getCarrierName() || '',
      isNetworkRoaming: subscriber.getDataRoaming() === 1 || null,
      phoneNumber: subscriber.getNumber() || '',
      mcc: subscriber.getMcc() || '',
      mnc: subscriber.getMnc() || '',
      subscriptionId: subscriber.getSubscriptionId() || null,
      simSerialNumber: subscriber.getIccId() || '',
      isDefaultSim: false,
    };

    if (this.apiLevel >= 29) {
      data = Object.assign({}, data, {
        simId: subscriber.getCardId() || null,
        carrierId: subscriber.getCarrierId() || null,
        mcc: subscriber.getMccString() || '',
        mnc: subscriber.getMncString() || '',
      });
    }
    return data;
  }

  private getDataFromTelephonyManager(manager): SimData {
    const data: SimData = {
      isoCountryCode: manager.getSimCountryIso() || '',
      simOperator: manager.getSimOperator() || '',
      carrierName: manager.getSimOperatorName() || '',
      callState: manager.getCallState() || null,
      dataActivity: manager.getDataActivity() || null,
      networkType: manager.getDataNetworkType() || null,
      phoneType: manager.getPhoneType() || null,
      simState: manager.getSimState() || null,
      isNetworkRoaming: manager.isNetworkRoaming() || null,
      mcc: '',
      mnc: '',
      phoneNumber: manager.getLine1Number() || '',
      deviceImei: manager.getImei() || '',
      deviceMeid: manager.getMeid() || '',
      deviceSoftwareVersion: manager.getDeviceSoftwareVersion() || '',
      simSerialNumber: manager.getSimSerialNumber() || '',
      subscriberId: manager.getSubscriberId() || '',
      isDefaultSim: true,
    };

    if (data.simOperator.length >= 3) {
      data.mcc = data.simOperator.substring(0, 3);
      data.mnc = data.simOperator.substring(3);
    }
    return data;
  }

}
