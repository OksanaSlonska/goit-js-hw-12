import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const markup = images
    .map(
      image => `
    <li class="gallery__item">
      <a href="${image.largeImageURL}" class="gallery__link">
        <img src="${image.webformatURL}" alt="${image.tags}" class="gallery__image" />
      </a>
      <div class="gallery__info">
        <p class="gallery__info-item"><b>Likes</b> ${image.likes}</p>
        <p class="gallery__info-item"><b>Views</b> ${image.views}</p>
        <p class="gallery__info-item"><b>Comments</b> ${image.comments}</p>
        <p class="gallery__info-item"><b>Downloads</b> ${image.downloads}</p>
      </div>
    </li>
  `
    )
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader-backdrop').classList.remove('is-hidden');
}

export function hideLoader() {
  document.querySelector('.loader-backdrop').classList.add('is-hidden');
}
