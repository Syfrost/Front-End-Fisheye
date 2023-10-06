let numberTotalOfLikes = document.querySelector('#numberOfLikes');
const photographerId = new URLSearchParams(window.location.search).get('id');
let photographerMedias = [];
let likesTab = [];

function likeDislike() {
    const likeButtons = document.querySelectorAll('.likeButton');
    const spanLikes = document.querySelectorAll('.likesNumber');
    let likeTotal = 0;

    likeButtons.forEach((button, i) => {
        button.addEventListener('click', (e) => {
            const mediaId = e.target.getAttribute('id');
            console.log(e.target); //DEBUG
            //const media = likesTab.find(objectMedia => objectMedia.id === mediaId);
            const media = likesTab.find(objectMedia => objectMedia.id.toString() === mediaId.toString());
            console.log(mediaId); //DEBUG
            console.log(media); //DEBUG

            if (media.isLike === false) {
                e.target.classList.add('isLike');
                media.likes++;
                likeTotal++;
                media.isLike = true;
            } else {
                e.target.classList.remove('isLike');
                media.likes--;
                likeTotal--;
                media.isLike = false;
            }
            spanLikes[i].innerText = media.likes;
            numberTotalOfLikes.innerText = likeTotal;
        });
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });

                button.querySelector('i').dispatchEvent(clickEvent);
                e.preventDefault();
            }
        });
    });

    likeTotal = likesTab.reduce((total, media) => total + media.likes, 0);
    numberTotalOfLikes.innerText = likeTotal;
}

async function getPhotographersInfo(photographerId) {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    let allDataPhotographers = data.photographers;
    let allDataMedia = data.media;

    const photographerInfo = allDataPhotographers.filter(photographers => photographers.id == photographerId )[0];

    const photographerMedias = allDataMedia.filter(objectMedia =>  objectMedia.photographerId == photographerId)

    return( { photographerInfo, photographerMedias} )
}

function getUserHeaderDOM(data) {
    const { name, portrait, city, country, tagline } = data;

    document.title = `${name} - Fisheye`;

    // création des elements du DOM
    const picture = `assets/photographers/${portrait}`;
    const infosDiv = document.createElement('div');
    const h1 = document.createElement('h1');
    const localisationParagraph = document.createElement('p');
    const taglineParagraph = document.createElement('p');
    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    const portraitDiv = document.createElement('div');
    const img = document.createElement('img');

    // modification des elements du DOM
    h1.textContent = name;
    localisationParagraph.textContent = city + ", " + country;
    taglineParagraph.textContent = tagline;
    button.textContent = "Contactez-moi";

    // Ajout des attributs
    localisationParagraph.setAttribute('id', 'localisation');
    taglineParagraph.setAttribute('id', 'tagline');
    button.classList.add('contact_button');
    button.setAttribute('aria-label', "Contact me");
    img.setAttribute("src", picture);
    img.setAttribute('aria-label', name);

    // Ajout des elements enfants a <article>
    infosDiv.appendChild(h1);
    infosDiv.appendChild(localisationParagraph);
    infosDiv.appendChild(taglineParagraph);
    buttonDiv.appendChild(button);
    portraitDiv.appendChild(img);

    // Ajout d'event listener
    button.addEventListener('click', () => {
        displayModal(name)
    });

    let result = {infosDiv, buttonDiv, portraitDiv};
    return result;
}

function getUserMedia(photographerData) {
    const mediaSection = document.querySelector('.photograph-media');

    const photographerInfo = photographerData.photographerInfo;
    photographerMedias = photographerData.photographerMedias;
    photographerMedias = getMediaSorted(photographerMedias, document.querySelector('#dropdown-title').innerText);

    console.log(photographerMedias); //DEBUG

    let position = 0;
    let numberofLikesInt = 0;

    photographerMedias.forEach((media) => {
        let mediaLikesInfo = {id : media.id, likes : media.likes, isLike : false};
        if(likesTab.map(function(x) {return x.id; }).indexOf(mediaLikesInfo.id) === -1){
            likesTab.push(mediaLikesInfo);
        }
        const mediaModel = mediaFactory(media, photographerInfo.name);
        mediaModel.setAttribute('data-position', position);
        mediaSection.appendChild(mediaModel);
        numberofLikesInt = numberofLikesInt + media.likes;
        numberTotalOfLikes.innerText = numberofLikesInt;
        position++;
    })

    getCarrousel();
    console.log("Carroussel index actu"); //DEBUG log
}

function getUserPrice(data) {
    const { price } = data;

    const priceSpan = document.querySelector('.price');

    priceSpan.textContent = price + "€ / jour";
}

async function displayDataPhotographer(photographerData) {
    const photographerHeader = document.querySelector('.photograph-header');
    const userHeaderDOM = getUserHeaderDOM(photographerData.photographerInfo);
    photographerHeader.appendChild(userHeaderDOM.infosDiv);
    photographerHeader.appendChild(userHeaderDOM.buttonDiv);
    photographerHeader.appendChild(userHeaderDOM.portraitDiv);

    getUserMedia(photographerData)

    getUserPrice(photographerData.photographerInfo);
}

async function init() {
    const photographersInfo = await getPhotographersInfo(photographerId);
    displayDataPhotographer(photographersInfo);
    console.log(photographersInfo);

    likeDislike();
}

init();