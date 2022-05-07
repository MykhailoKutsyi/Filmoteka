
const arrowTop = document.querySelector('#arrowTop');
const arrowBottom = document.querySelector('#arrowBottom');

function showArrows() {
  // висота вікна (область перегляду браузера)
  let viewportHeight = document.documentElement.clientHeight;
    console.log(pageYOffset);
    console.log(viewportHeight);  
      // высота HTML-страницы
    let htmlHeight = document.documentElement.scrollHeight;
    console.log(htmlHeight)
      // обмежувач за висотою для видимості нижньої стрілки
  let heightLimiter = htmlHeight - 2 * viewportHeight;
    console.log(heightLimiter); 
    
  if (pageYOffset < viewportHeight) {
    //   arrowTop.hidden === true;
      arrowTop.classList.add('arrow-item-show')
    }
      if ( pageYOffset > heightLimiter) {
    //   arrowTop.hidden === true;
      arrowTop.classList.add('arrow-item-show')
  }
//   else {
    //   arrowTop.hidden === false;
    //   arrowTop.classList.remove('arrow-item-show');
//   }



//   if (pageYOffset > heightLimiter) {
    // arrowBottom.hidden === true;
    //   arrowBottom.classList.add('arrow-item-show')
//   } else {
    //   arrowBottom.hidden === false;
    //   arrowBottom.classList.remove('arrow-item-show');
//   }
}

window.addEventListener('scroll', showArrows);
// window.addEventListener("resize", showArrows);

arrowTop.addEventListener('click', function () {
  scrollTo(pageXOffset, 0);
});

arrowBottom.addEventListener('click', function () {
  // высота HTML-страницы
  let htmlHeight = document.documentElement.scrollHeight;

  scrollTo(pageXOffset, htmlHeight);
});
