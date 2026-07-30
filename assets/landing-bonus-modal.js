window.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.bonus-modal');
    const openButton = document.querySelector('.bonus-modal-trigger');
    const closeButton = modal?.querySelector('.bonus-modal__close');
    const overlay = modal?.querySelector('.bonus-modal__overlay');

    if (!modal || !openButton || !closeButton || !overlay) return;

    const openModal = function () {
        modal.classList.add('bonus-modal--open');
        modal.setAttribute('aria-hidden', 'false');
        openButton.setAttribute('aria-expanded', 'true');
        document.body.classList.add('bonus-modal-open');
        closeButton.focus();
    };

    const closeModal = function () {
        modal.classList.remove('bonus-modal--open');
        modal.setAttribute('aria-hidden', 'true');
        openButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('bonus-modal-open');
        openButton.focus();
    };

    openButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.classList.contains('bonus-modal--open')) {
            closeModal();
        }
    });
});
