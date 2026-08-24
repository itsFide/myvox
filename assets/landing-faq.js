/**
 * FAQ Accordion
 *
 * Надёжная анимация на основе scrollHeight — текст никогда не обрезается.
 * При открытии закрывает остальные элементы (один открытый за раз).
 * После завершения анимации height сбрасывается в «auto», чтобы корректно
 * работать при изменении размера окна.
 */

class FaqAccordion {
  /** @type {HTMLElement} */
  #root;

  /** @type {NodeListOf<HTMLElement>} */
  #items;

  /** @param {HTMLElement} root */
  constructor(root) {
    this.#root = root;
    this.#items = root.querySelectorAll('.faq-item');
    this.#init();
  }

  #init() {
    this.#items.forEach((item) => {
      const button = item.querySelector('.faq-item__summary, .faq-item__button');
      const content = item.querySelector('.faq-item__content');

      if (!button || !content) return;

      const isActive = item.classList.contains('faq-item--active');

      if (isActive) {
        content.style.height = 'auto';
        button.setAttribute('aria-expanded', 'true');
      } else {
        content.style.height = '0px';
        button.setAttribute('aria-expanded', 'false');
      }

      content.style.overflow = 'hidden';

      button.addEventListener('click', () => this.#toggle(item));
    });
  }

  /** @param {HTMLElement} item */
  #toggle(item) {
    if (item.classList.contains('faq-item--active')) {
      this.#close(item);
    } else {
      this.#items.forEach((other) => {
        if (other !== item && other.classList.contains('faq-item--active')) {
          this.#close(other);
        }
      });
      this.#open(item);
    }
  }

  /** @param {HTMLElement} item */
  #open(item) {
    const button = item.querySelector('.faq-item__summary, .faq-item__button');
    const content = item.querySelector('.faq-item__content');
    if (!button || !content) return;

    this.#cancelAnimation(content);

    item.classList.add('faq-item--active');
    button.setAttribute('aria-expanded', 'true');

    const startHeight = parseFloat(content.style.height) || 0;
    content.style.height = startHeight + 'px';

    const raf = requestAnimationFrame(() => {
      const targetHeight = content.scrollHeight;
      content.style.transition = 'height 0.35s ease';
      content.style.height = targetHeight + 'px';

      const onEnd = () => {
        content.removeEventListener('transitionend', onEnd);
        content.style.height = 'auto';
        content.style.transition = '';
        content._pendingTransitionEnd = null;
      };

      content.addEventListener('transitionend', onEnd);
      content._pendingTransitionEnd = onEnd;
    });

    content._pendingRaf = raf;
  }

  /** @param {HTMLElement} item */
  #close(item) {
    const button = item.querySelector('.faq-item__summary, .faq-item__button');
    const content = item.querySelector('.faq-item__content');
    if (!button || !content) return;

    this.#cancelAnimation(content);

    item.classList.remove('faq-item--active');
    button.setAttribute('aria-expanded', 'false');

    // Фиксируем высоту в px (на случай если была 'auto')
    content.style.height = content.scrollHeight + 'px';
    // Принудительный reflow
    void content.offsetHeight;

    const raf = requestAnimationFrame(() => {
      content.style.transition = 'height 0.35s ease';
      content.style.height = '0px';

      const onEnd = () => {
        content.removeEventListener('transitionend', onEnd);
        content.style.transition = '';
        content._pendingTransitionEnd = null;
      };

      content.addEventListener('transitionend', onEnd);
      content._pendingTransitionEnd = onEnd;
    });

    content._pendingRaf = raf;
  }

  /** @param {HTMLElement} content */
  #cancelAnimation(content) {
    if (content._pendingRaf) {
      cancelAnimationFrame(content._pendingRaf);
      content._pendingRaf = null;
    }
    if (content._pendingTransitionEnd) {
      content.removeEventListener('transitionend', content._pendingTransitionEnd);
      content._pendingTransitionEnd = null;
    }
    content.style.transition = '';
    const computed = getComputedStyle(content).height;
    content.style.height = computed;
  }
}

function initFaqAccordion() {
  document.querySelectorAll('.faq__accordion, .faq__items').forEach((root) => {
    if (root instanceof HTMLElement) {
      new FaqAccordion(root);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFaqAccordion);
} else {
  initFaqAccordion();
}
