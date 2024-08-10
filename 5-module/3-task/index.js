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
