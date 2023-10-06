function mediaFactory(data, name) {
    if (data.image) {
        return getImage(data, name);
    } else if (data.video) {
        return getVideo(data, name);
    } else {
        return "Unknown type";
    }
}
function getImage(data, name) {
    let firstname = name.split(' ')[0].split('-').join(' ');

    const article = getMediaDOM(data);
    const button = document.createElement('button');
    const img = document.createElement('img');

    button.setAttribute('aria-label', `${data.title} publié par ${name}`);
    img.setAttribute("src", `assets/images/${firstname}/${data.image}`);
    img.setAttribute("alt", `${data.title} publié par ${name}`);
    img.classList.add('image');
    img.classList.add('media-element');
    button.appendChild(img)
    article.insertBefore(button, article.firstChild);
    // console.log(article); //DEBUG LOG
    return(article);
}

function getVideo(data, name) {
    let firstname = name.split(' ')[0].split('-').join(' ');

    const article = getMediaDOM(data);
    const button = document.createElement('button');
    const video = document.createElement('video');
    const source = document.createElement('source');

    button.setAttribute('aria-label', `${data.title} publié par ${name}`);
    source.setAttribute("src", `assets/images/${firstname}/${data.video}`);
    video.classList.add('video');
    video.classList.add('media-element');
    video.setAttribute('loop', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.preload="metadata";
    video.appendChild(source);
    button.appendChild(video)
    article.insertBefore(button, article.firstChild);

    // console.log(article); //DEBUG LOG
    return(article);
}