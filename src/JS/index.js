import '../sass/main.scss';
import PixabayApiService from './apiService';
import cardsTpl from '../template/cards';
import { defaults, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaults.delay = 4000;

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

  // empty form submit validation
  if (pixabayApiService.query === '') {
    error({
      title: 'Something went wrong',
      text: 'Please make your query more specific',
    });
    return;
  }

  try {
    const queryCards = await pixabayApiService.fetchImages();

    // wrong request validation
    if (queryCards.hits.length === 0) {
      error({
        title: 'Something went wrong',
        text: 'Please make your query more specific',
      });
      return;
    }

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
