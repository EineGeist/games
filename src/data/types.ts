export interface GameData {
  id: string;
  name: string;
  imageFullPath: string;
  url: string;
  merchantId: string;
  categoryId: string[];
}

export interface CategoryData {
  id: string;
  name: string;
}

export interface MerchantData {
  id: string;
  name: string;
}

export interface Data {
  games: GameData[];
  categories: CategoryData[];
  merchants: {
    [prop: string]: MerchantData;
  };
}
