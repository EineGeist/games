export interface MerchantData {
  id: string;
  name: string;
}

export interface MerchantsState {
  [prop: string]: MerchantData;
}
