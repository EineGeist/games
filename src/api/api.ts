import { FetchedData } from './types';

class Api {
  private static instance: Api;

  private constructor() {}

  public static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }

    return Api.instance;
  }

  readonly API_PATH = 'https://www.rost.bet/api/v1/games';

  async requestData() {
    try {
      const response = await fetch(this.API_PATH);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return {
        ok: true,
        data: this.processData(await response.json()),
      };
    } catch (err) {
      return {
        ok: false,
        error: err,
      };
    }
  }

  processData({ games, categories, merchants }: any): FetchedData {
    const processedGames: FetchedData['games'] = games.map((game: any) => ({
      id: game.ID,
      name: game.Name.en,
      imageFullPath: game.ImageFullPath,
      url: game.Url,
      merchantId: game.MerchantID,
      categoryId: game.CategoryID,
      favorite: false,
    }));

    const processedCategories: FetchedData['categories'] = categories.map(
      (category: any) => ({
        id: category.ID,
        name: category.Name.en,
      })
    );

    const processedMerchants: FetchedData['merchants'] = Object.values(
      merchants
    ).map((merchant: any) => ({
      id: merchant.ID,
      name: merchant.Name,
    }));

    return {
      games: processedGames,
      categories: processedCategories,
      merchants: processedMerchants,
    };
  }
}

export default Api.getInstance();
