import * as applicationModule from 'tns-core-modules/application';
import * as permissions from 'nativescript-permissions';
import { SimData } from './sim-info.common';

export class SimInfo {

  permissionTypes = [];

  constructor() {
    this.permissionTypes = this.getPermissionTypes();
  }

  private getPermissionTypes(): string[] {
    const apiLevel = android.os.Build.VERSION.SDK_INT;

    if (apiLevel <= 22) { // android.os.Build.VERSION_CODES.LOLLIPOP_MR1 - 22
      return [android.Manifest.permission.READ_PHONE_STATE];
    } else if (apiLevel <= 25) { // android.os.Build.VERSION_CODES.N_MR1 - 25
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

  getData(): Promise<SimData> {
    let getData = Promise.resolve(null);

    if (!this.hasPermission()) {
      getData = permissions.requestPermissions(this.permissionTypes);
    }

    return getData.then(() => {
      const manager = applicationModule.android.context.getSystemService(android.content.Context.TELEPHONY_SERVICE);
      const results: SimData = {
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
        subscriberId: manager.getSubscriberId() || ''
      };

      if (results.simOperator.length >= 3) {
        results.mcc = results.simOperator.substring(0, 3);
        results.mnc = results.simOperator.substring(3);
      }

      return Promise.resolve(results);
    }).catch((err) => {
      return Promise.reject(err);
    });
  }

}
