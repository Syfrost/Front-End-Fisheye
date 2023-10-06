function displayModal(name) {
    const headerPage = document.querySelector('#headerPage');
    const main = document.querySelector('#main');
    const modal = document.getElementById("contact_modal");
    const modalCloseButton = document.querySelector('#modalCloseButton');

    modal.style.display = "flex";
    headerPage.setAttribute('aria-hidden', 'true');
    main.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-label', `Contact me ${name}`)
    modalCloseButton.focus();
    document.querySelector('body').style.overflow = 'hidden';

    document.querySelector('#photographerNameForModal').textContent = name;
}

function closeModal() {
    const headerPage = document.querySelector('#headerPage');
    const main = document.querySelector('#main');
    const modal = document.getElementById("contact_modal");
    const modalOpenButton = document.querySelector('.contact_button');

    modal.style.display = "none";
    headerPage.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-hidden', 'true');
    modalOpenButton.focus();
    document.querySelector('body').style.overflow = 'auto';
}

function validateAttribut(condition, querySelector){
    if(condition) {
        querySelector.setAttribute('data-error-visible', true)
    } else {
        querySelector.setAttribute('data-error-visible', false)
    }

    return !condition
}

function sendInfo(){
    let firstname = document.querySelector("#firstname");
    let lastname = document.querySelector('#lastname');
    let email = document.querySelector('#email');
    let message = document.querySelector('#message');

    let verifyFirst = validateAttribut(firstname.value.length <= 2 || firstname.value.match(/^\s*$/g) || firstname.value.match('[0-9]'), document.querySelector('.formData.firstname'));
    let verifyLast = validateAttribut(lastname.value.length <= 2 || lastname.value.match(/^\s*$/g) || lastname.value.match('[0-9]'), document.querySelector('.formData.lastname'));
    let verifyEmail = validateAttribut(!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || email.value.match(/^\s*$/g), document.querySelector('.formData.email'));
    let verifyMessage = validateAttribut(message.value.length <= 2 || message.value.match(/^\s*$/g), document.querySelector('.formData.message'))

    let verifyAll = verifyFirst && verifyLast && verifyEmail && verifyMessage;

    console.log(verifyFirst)
    console.log(verifyLast)
    console.log(verifyEmail)
    console.log(verifyMessage)

    if(verifyAll) {
        console.log(`FN → ${firstname.value} LN → ${lastname.value} @ → ${email.value}`); //DEBUG LOG
        console.log(`Message : ${message.value}`); //DEBUG LOG

        document.querySelector('.contactForm').style.display = 'none';
        document.querySelector('.buttonBox').style.display = 'none';
        document.querySelector('.confirmationMessage').style.display = 'block';

        setTimeout(closeModal, 2000)
    }


    return verifyAll


}

document.addEventListener('keydown', (e) => {
    if(document.getElementById("contact_modal").style.display === "flex" && e.key === 'Escape'){
        closeModal();
    }
})