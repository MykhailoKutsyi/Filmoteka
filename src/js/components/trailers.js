import * as basicLightbox from 'basiclightbox';
import { API_KEY, URL } from '../utils/constants';

function createTrailerLink(elementRef) {
  const trailerBtn = elementRef;

  trailerBtn.forEach(el =>
    el.addEventListener('click', e => {
      drawModalForTrailler(e.target.dataset.id);
    }),
  );

  function drawModalForTrailler(id) {
    const url = `${URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const id = data.results[0].key;
        const instance = basicLightbox.create(`
  <iframe width="980" height="525" src='https://www.youtube.com/embed/${id}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`);
        instance.show();
        modalClBtTrailer(instance);
      })
      .catch(() => {
        const instance = basicLightbox.create(`
    <img width="980" height="525S" src="https://moviemaker.minitool.com/images/uploads/articles/2020/08/youtube-video-not-available/youtube-video-not-available-1.png" alt="no found trailer" class="trailer_video">
      `);

        instance.show();
        modalClBtTrailer(instance);
      });
  }

  function modalClBtTrailer(instance) {
    const modalBox = document.querySelector('.basicLightbox--iframe');
    modalBox.insertAdjacentHTML(
      'afterbegin',
      `<button
        type="button"
        class="lightbox__button"
        data-action="close-lightbox"
        ></button>
    `,
    );
    const modalCloseBtn = document.querySelector(
      '[data-action="close-lightbox"]',
    );
    modalCloseBtn.addEventListener('click', () => instance.close());
  }
}

export default { createTrailerLink };
