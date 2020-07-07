import { Data, GameData, CategoryData } from './types';

export default new (class {
  private readonly instance: this | null = null;

  constructor() {
    if (this.instance) return this.instance;
    this.instance = this;
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

  processData({ games, categories, merchants }: any): Data {
    const processedGames = games.map(
      (game: any): GameData => ({
        id: game.ID,
        name: game.Name.en,
        imageFullPath: game.ImageFullPath,
        url: game.Url,
        merchantId: game.MerchantID,
        categoryId: game.CategoryID,
        favorite: false,
      })
    );

    const processedCategories = categories.map(
      (category: any): CategoryData => ({
        id: category.ID,
        name: category.Name.en,
      })
    );

    const processedMerchants: Data['merchants'] = {};

    for (const { ID: id, Name: name } of Object.values(merchants) as any) {
      processedMerchants[id] = { id, name };
    }

    return {
      games: processedGames,
      categories: processedCategories,
      merchants: processedMerchants,
    };
  }
})();
