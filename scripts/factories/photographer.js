function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // création des elements du DOM
        const article = document.createElement( 'article' );
        const img = document.createElement('img');
        const a = document.createElement('a');
        const h2 = document.createElement('h2');
        const div = document.createElement('div');
        const localisationText = document.createElement('p');
        const taglineText = document.createElement('p');
        const priceText = document.createElement('p');

        // modification des elements du DOM
        h2.textContent = name;
        localisationText.textContent = city + ", " + country;
        taglineText.textContent = tagline;
        priceText.textContent = price + "€/jour";

        // Ajout des attributs
        article.setAttribute('role', name + "\'s card");
        a.setAttribute('href', `photographer.html?id=${id}`)
        a.setAttribute('aria-label', name);
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        localisationText.setAttribute('class', 'localisation');
        taglineText.setAttribute('class', 'tagline');
        priceText.setAttribute('class', 'price');

        // Ajout des elements enfants a <article>
        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(div);
        div.appendChild(localisationText);
        div.appendChild(taglineText);
        div.appendChild(priceText);
        article.appendChild(a);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}