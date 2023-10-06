const prevButton = document.querySelector('.prev-image');
const nextButton = document.querySelector('.next-image');
const carrousel = document.getElementById("box_carrousel");
const carrouselCloseButton = document.querySelector('#carrouselCloseButton');
let mediaPlace = document.querySelector('#divMedia');

function openCarrousel() {
    carrousel.style.display = 'flex';
    document.querySelector('body').style.overflow = 'hidden';
    carrouselCloseButton.focus();
}

function closeCarrousel() {
    carrousel.style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
    mediaPlace.innerHTML = "";
}

function createSlide(article) {
    const mediaTitle = document.createElement('p');
    const mediaElement = article.querySelector('img, video').cloneNode(true);
    if (mediaElement.tagName.toLowerCase() === 'video') {
        mediaElement.setAttribute('controls', '');
        mediaElement.removeAttribute('loop');
        mediaElement.removeAttribute('muted');
    }
    mediaPlace.innerHTML = "";
    mediaPlace.appendChild(mediaElement);
    //mediaTitle.innerText = article.querySelector('.titlemedia').innerText;
    mediaTitle.innerText = article.childNodes[1].childNodes[0].innerText;
    mediaPlace.appendChild(mediaTitle);
}

function getCarrousel() {
    const articles = document.querySelectorAll('article');
    let position = 0;

    articles.forEach((article, index) => {
        const buttonForCarrousel = article.querySelector('button');
        buttonForCarrousel.addEventListener("click", () => {
            openCarrousel();
            createSlide(article);
            position = index;
        });
    });

    const goToNextSlide = () => {
        console.log("pos1");console.log(position); //DEBUG LOG
        position = (position + 1) % articles.length;
        console.log("pos2");console.log(position); //DEBUG LOG
        console.log("length");console.log(articles.length); //DEBUG LOG
        createSlide(articles[position]);
    };

    const goToPreviousSlide = () => {
        console.log("pos1");console.log(position); //DEBUG LOG
        position = (position - 1 + articles.length) % articles.length;
        console.log("pos2");console.log(position); //DEBUG LOG
        console.log("length");console.log(articles.length); //DEBUG LOG
        createSlide(articles[position]);
    };

    prevButton.addEventListener('click', goToPreviousSlide);
    nextButton.addEventListener('click', goToNextSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
            goToPreviousSlide();
        } else if (carrousel.style.display === 'flex' && e.key === 'Escape') {
            closeCarrousel();
        }
    });
}
