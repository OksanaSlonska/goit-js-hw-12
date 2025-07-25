import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let currentQuery = '';
let totalImages = 0;

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreButton = document.querySelector('.load-more');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  currentQuery = input.value.trim();

  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Введіть пошуковий запит!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  loadMoreButton.style.display = 'none';
  showLoader();

  currentPage = 1;
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    if (!data || data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalImages = data.totalHits;
    // console.log('Total Images:', totalImages);
    createGallery(data.hits);

    if (data.hits.length < totalImages) {
      loadMoreButton.style.display = 'block';
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Щось пішло не так. Спробуйте пізніше.',
      position: 'topRight',
    });
  }
});

loadMoreButton.addEventListener('click', async function () {
  currentPage += 1;

  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    createGallery(data.hits);

    const loadedImages = document.querySelectorAll('.gallery img').length;
    // console.log('Loaded Images:', loadedImages);
    if (loadedImages >= totalImages) {
      loadMoreButton.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    const card = document.querySelector('.gallery__item');
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Щось пішло не так. Спробуйте пізніше.',
      position: 'topRight',
    });
  }
});
