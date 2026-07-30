var faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(function (item) {
  var content = item.querySelector('.faq-item__content');
  content.style.setProperty('--faq-height', content.scrollHeight + 'px');
});

faqItems.forEach(function (item) {
  var btn = item.querySelector('.faq-item__button');
  btn.addEventListener('click', function () {
    var content = item.querySelector('.faq-item__content');

    if (item.classList.contains('faq-item--active')) {
      content.style.setProperty('--faq-height', '0px');
      item.classList.remove('faq-item--active');
      item.querySelector('.faq-item__button').setAttribute('aria-expanded', 'false');
    } else {
      content.style.setProperty('--faq-height', content.scrollHeight + 'px');
      item.classList.add('faq-item--active');
      item.querySelector('.faq-item__button').setAttribute('aria-expanded', 'true');
    }
  });
});
