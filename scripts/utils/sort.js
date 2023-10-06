let dropButton = document.querySelector('.drop-btn');
let actualTitle = document.querySelector('#dropdown-title');
let sortName = document.querySelectorAll('.sort-name');
let liDropdown = document.querySelectorAll('.li-dropdown');

dropButton.addEventListener('click', toggleSorter)

function toggleSorter() {

    if(dropButton.classList.contains('close')){
        document.querySelector('.dropdown-arrow').style.transform = "rotate(-360deg)";

        dropButton.classList.add('open');
        dropButton.classList.remove('close');

        document.querySelector('.dropdown-menu').style.display = 'block';
    }
    else if(dropButton.classList.contains('open')){
        document.querySelector('.dropdown-arrow').style.transform = "rotate(-180deg)";

        dropButton.classList.add('close');
        dropButton.classList.remove('open');

        document.querySelector('.dropdown-menu').style.display = 'none';
    }

    for(let i = 0 ; i < sortName.length ; i++){
        if(actualTitle.innerText === sortName[i].innerText) {
            liDropdown[i].style.display = 'none';
        } else {
            liDropdown[i].style.display = 'block';
        }
    }
}

async function sort(filter){
    const mediaSection = document.querySelector('.photograph-media');
    actualTitle.innerText = filter;
    mediaSection.innerHTML = "";

    const infos = await getPhotographersInfo(photographerId);
    const mediaSorted = getUserMedia(infos);
    toggleSorter();
    likeDislike();
    return mediaSorted;
}
function getMediaSorted(photographerMedias, filter) {
    console.log("Sorted"); //DEBUG LOG
    switch (filter) {
        case "Popularité":
            return photographerMedias.sort((a, b) => b.likes - a.likes);
        case "Titre":
            return photographerMedias.sort((a, b) => a.title.localeCompare(b.title));
        case "Date":
            return photographerMedias.sort((a, b) => b.date.localeCompare(a.date));
        default:
            return photographerMedias;
    }

}