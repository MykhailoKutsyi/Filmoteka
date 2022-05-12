const arrowTop = document.querySelector('#arrowTop');
const arrowBottom = document.querySelector('#arrowBottom');
export const hederRef = document.querySelector('.header');
const footer = document.querySelector('.footer');

window.addEventListener('scroll', showArrows);
arrowTop.addEventListener('click', function () {
  // scrollTo(pageXOffset, 0);
  scrollTo(hederRef);
});
arrowBottom.addEventListener('click', function () {
  // висота HTML-сторінки
  let htmlHeight = document.documentElement.scrollHeight;
  // scrollTo(pageXOffset, htmlHeight);
  scrollTo(footer);
});

function showArrows() {
  // висота вікна (область перегляду браузера)
  let viewportHeight = document.documentElement.clientHeight;
  // висота HTML-сторінки
  let htmlHeight = document.documentElement.scrollHeight;
  // обмежувач за висотою для видимості нижньої стрілки
  let heightLimiter = htmlHeight - 2 * viewportHeight;
  if (pageYOffset < viewportHeight) {
    arrowTop.classList.add('arrow--show');
  }
  if (pageYOffset > heightLimiter) {
    arrowTop.classList.add('arrow--show');
  }
}
export function scrollTo(element) {
  window.scroll({
    left: 0,
    top: element.offsetTop,
    behavior: 'smooth',
  });
}
