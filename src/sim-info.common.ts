export interface SimData {
  isoCountryCode: string;
  simOperator?: string;
  carrierName: string;
  callState?: number | null;
  dataActivity?: number | null;
  networkType?: number | null;
  phoneType?: number | null;
  simState?: number | null;
  isNetworkRoaming?: boolean | null;
  phoneNumber?: string;
  deviceImei?: string;
  deviceMeid?: string;
  deviceSoftwareVersion?: string;
  simSerialNumber?: string;
  subscriberId?: string;
  subscriptionId?: number | null;
  mcc?: string;
  mnc?: string;
  allowsVOIP?: boolean | null;
  isDefaultSim?: boolean | null;
}
