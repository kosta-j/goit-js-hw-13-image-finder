const AUTH_KEY = '22389180-c3e3825fb04f5ed43216d445d';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
  }

  async fetchImages() {
    const response =
      await fetch(`${BASE_URL}&q=${this.searchQuery}&page=1&per_page=12&key=${AUTH_KEY}
  `);
    return response.json();
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
