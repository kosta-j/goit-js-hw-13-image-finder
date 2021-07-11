import '../sass/main.scss';
// import fetchedImages from './apiService';
import PixabayApiService from './apiService';
import cardsTpl from '../template/cards';
import debounce from 'lodash.debounce';

const refs = {
  cardsContainer: document.querySelector('.js-cards'),
  searchForm: document.querySelector('#search-form'),
  loadMorebtn: document.querySelector('.js-more-btn'),
};

const pixabayApiService = new PixabayApiService();

refs.searchForm.addEventListener('submit', onSearchSubmit);
refs.loadMorebtn.addEventListener('click', onLoadMoreClick);

async function onSearchSubmit(e) {
  e.preventDefault();
  pixabayApiService.resetPageNumber();
  pixabayApiService.query = e.currentTarget.elements.query.value;

  try {
    const queryCards = await pixabayApiService.fetchImages();
    clearImages();
    render(queryCards.hits);
    showLoadmoreBtn();
  } catch (e) {
    console.log(e);
  }
}

async function onLoadMoreClick() {
  try {
    pixabayApiService.incrementPageNumber();
    const queryCards = await pixabayApiService.fetchImages();
    render(queryCards.hits);
    showLoadmoreBtn();
  } catch (e) {
    console.log(e);
  }
}

function render(cards) {
  refs.cardsContainer.insertAdjacentHTML('beforeend', cardsTpl(cards));
}

function clearImages() {
  refs.cardsContainer.innerHTML = '';
}

function showLoadmoreBtn() {
  refs.loadMorebtn.style.display = 'flex';
}

function hideLoadmoreBtn() {
  refs.loadMorebtn.style.display = 'none';
}
