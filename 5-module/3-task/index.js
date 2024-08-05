function initCarousel() {
let arrowLeft = document.querySelector('.carousel__arrow_left');
let arrowRight = document.querySelector('.carousel__arrow_right');
let carousel = document.querySelector('.carousel__inner');
let carouselWidth = carousel.offsetWidth;
let x = 0, y = 0;

arrowLeft.style.display = 'none';

arrowRight.addEventListener('click', () => {
    x += carouselWidth;
    y += 1;

    if (y >= 3) {
        arrowRight.style.display = 'none';
    } 
    if (y > 0) {
        arrowLeft.style.display = '';
    }
    carousel.style.transform = `translateX(-${x + "px"})`
    /* Подскажите пожалуйста, у меня ранее в коде здесь была строчка 
return x, y; почему она здесь не нужна я просто не пойму... получается 
при клике задается ведь новое значение переменной и оно должно 
возвращаться, чтобы при клике на другую кнопку продолжалось с нового заданного числа.
Вообщем почему не нужен return x,y?
*/
    })

arrowLeft.addEventListener('click', () => {
    x -= carouselWidth;
    y -= 1;
        
    if (y <= 0) {
        arrowLeft.style.display = 'none';
    } 
    if (y < 3) {
        arrowRight.style.display = '';
    }

    carousel.style.transform = `translateX(-${x + "px"})`
    })
}
