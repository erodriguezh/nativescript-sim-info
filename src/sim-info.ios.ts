import { SimData } from './sim-info.common';

export class SimInfo {
  /**
   * Return Data from multiple sims (serviceSubscriberCellularProviders) if possible
   * or return data from the active sim (subscriberCellularProvider)
   */
  getData(): Promise<SimData[]> {
    const telephonyInfo = TelephonyInfo.alloc();
    const data = JSON.parse(String(telephonyInfo.getData()));

    if (data.length === 0) {
      return Promise.reject('Sim information is unaccessible');
    } else {
      return Promise.resolve(data);
    }
  }
}
