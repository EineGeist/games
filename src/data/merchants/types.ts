export interface MerchantData {
  id: string;
  name: string;
}

export type MerchantsArray = MerchantData[];

export interface MerchantsState {
  [prop: string]: MerchantData;
}
