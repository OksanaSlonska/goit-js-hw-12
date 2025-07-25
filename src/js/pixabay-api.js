import axios from 'axios';

const API_KEY = '11370735-3d6e0314cf2e59c2293396bf4';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Помилка при запиті Pixabay:', error);
    return null;
  }
}
