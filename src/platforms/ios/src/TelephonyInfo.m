#import <Foundation/Foundation.h>
#import "TelephonyInfo.h"
#import <CoreTelephony/CTCarrier.h>
#import <CoreTelephony/CTTelephonyNetworkInfo.h>

@implementation TelephonyInfo : NSObject

- (NSString *)getData {
  CTTelephonyNetworkInfo *networkInfo = [[CTTelephonyNetworkInfo alloc]init];
  if (@available(iOS 12.0, *)) {
    NSDictionary *providers = networkInfo.serviceSubscriberCellularProviders;
    NSMutableArray *providersData = [[NSMutableArray alloc]init];

    for(id key in providers) {
      CTCarrier *value = [providers objectForKey:key];
      [providersData addObject: [self getDataFromCarrier:value]];
    }

    return [self stringify: providersData];
  } else {
    CTCarrier *carrier = networkInfo.subscriberCellularProvider;
    NSMutableArray *result = [[NSMutableArray alloc]init];

    [result addObject: [self getDataFromCarrier:carrier] ];

    return [self stringify:result];
  }
}

- (NSDictionary *)getDataFromCarrier:(CTCarrier *)carrier {

  NSString *mobileCountryCode = [carrier mobileCountryCode];
  NSString *mobileNetworkCode = [carrier mobileNetworkCode];

  NSDictionary *dictionary = @{
    @"carrierName" : (carrier.carrierName!=NULL) ? carrier.carrierName : @"",
    @"isoCountryCode" : (carrier.isoCountryCode!=NULL) ? carrier.isoCountryCode : @"",
    @"allowsVOIP" : (carrier.allowsVOIP) ? @(carrier.allowsVOIP) : nil,
    @"mcc" : (mobileCountryCode!=NULL) ? mobileCountryCode : @"",
    @"mnc" : (mobileNetworkCode!=NULL) ? mobileNetworkCode : @""
  };

  return dictionary;
}

- (NSString *)stringify:(id)obj {
  NSError *error;
  NSString *jsonString = [[NSString alloc]init];
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:obj options:0 error:&error];

  if (!jsonData) {
    jsonString = @"[]";
  } else {
    jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  }

  return jsonString;
}

@end
