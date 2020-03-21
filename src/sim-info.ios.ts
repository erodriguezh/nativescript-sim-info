import { SimData } from './sim-info.common';

export class SimInfo {
  getData(): Promise<SimData | SimData[]> {
    const networkInfo = new CTTelephonyNetworkInfo();
    const providers = networkInfo.serviceSubscriberCellularProviders;

    if (Object.keys(providers).length > 0) {
      const providersData = [];
      for (let carrierIndex in providers) {
        const carrier: CTCarrier = providers[carrierIndex];
        providersData.push({
          allowsVOIP: carrier.allowsVOIP,
          carrierName: carrier.carrierName,
          isoCountryCode: carrier.isoCountryCode,
          mcc: carrier.mobileCountryCode,
          mnc: carrier.mobileNetworkCode,
        });
      }
      return Promise.resolve(providersData.length === 1 ? providersData[0] : providersData);
    } else {
      return Promise.reject('Sim information is unaccessible');
    }
  }
}
