import '../sass/main.scss';
// import fetchedImages from './apiService';
import PixabayApiService from './apiService';
import cardsTpl from '../template/cards';
import debounce from 'lodash.debounce';

const refs = {
  cardsContainer: document.querySelector('.js-cards'),
  searchInput: document.querySelector('#search-form input'),
  searchForm: document.querySelector('#search-form'),
};

const pixabayApiService = new PixabayApiService();

refs.searchInput.addEventListener('input', debounce(onSearchInput, 1000));

async function onSearchInput(e) {
  pixabayApiService.query = e.target.value;
  // const searchQuery = e.target.value;
  // console.log(searchQuery);

  try {
    const queryCards = await pixabayApiService.fetchImages();
    render(queryCards.hits);
  } catch (e) {
    console.log(e);
  }
}

function render(cards) {
  refs.cardsContainer.innerHTML = '';
  refs.cardsContainer.insertAdjacentHTML('beforeend', cardsTpl(cards));
}
