(function () {
  'use strict';

  if (window.UniversalImageModal) return;

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 4.0;
  const DEFAULT_ZOOM = 1.5;

  let modalEl = null;
  let backdropEl = null;
  let wrapperEl = null;
  let stageEl = null;
  let imgEl = null;
  let fitWidth = 0;
  let fitHeight = 0;

  let scale = 1.0;
  let baseScale = 1.0;
  let translateX = 0;
  let translateY = 0;

  // Interaction tracking state
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialTranslateX = 0;
  let initialTranslateY = 0;
  let tapStartX = 0;
  let tapStartY = 0;

  // Pinch-to-zoom tracking state
  let initialPinchDistance = 0;
  let initialPinchScale = 1.0;

  // Double tap state
  let lastTapTime = 0;

  /**
   * Inject modal HTML if not already present
   */
  function ensureModalDOM() {
    modalEl = document.getElementById('univ-image-modal');
    if (modalEl) {
      backdropEl = modalEl.querySelector('.univ-image-modal__backdrop');
      wrapperEl = modalEl.querySelector('.univ-image-modal__wrapper');
      stageEl = modalEl.querySelector('.univ-image-modal__stage');
      imgEl = modalEl.querySelector('#univ-image-modal-img');
      return;
    }

    const modalHTML = `
      <div id="univ-image-modal" class="univ-image-modal" aria-hidden="true" role="dialog" aria-modal="true" tabindex="-1">
        <div class="univ-image-modal__backdrop" data-action="close"></div>
        <div class="univ-image-modal__spinner"></div>
        <div class="univ-image-modal__wrapper">
          <div class="univ-image-modal__stage" data-action="stage">
            <img id="univ-image-modal-img" class="univ-image-modal__img" src="" alt="Modal Image" draggable="false" />
          </div>
        </div>
        <div class="univ-image-modal__controls">
          <button type="button" class="univ-image-modal__btn" data-action="zoom-out" title="Zoom Out" aria-label="Zoom Out">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </button>
          <button type="button" class="univ-image-modal__btn univ-image-modal__zoom-reset" data-action="zoom-reset" title="Reset Zoom">
            100%
          </button>
          <button type="button" class="univ-image-modal__btn" data-action="zoom-in" title="Zoom In" aria-label="Zoom In">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </button>
          <button type="button" class="univ-image-modal__btn univ-image-modal__close-btn" data-action="close" title="Close" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    modalEl = document.getElementById('univ-image-modal');
    backdropEl = modalEl.querySelector('.univ-image-modal__backdrop');
    wrapperEl = modalEl.querySelector('.univ-image-modal__wrapper');
    stageEl = modalEl.querySelector('.univ-image-modal__stage');
    imgEl = modalEl.querySelector('#univ-image-modal-img');

    attachEvents();
  }

  function fitImage() {
    if (!imgEl.naturalWidth || !imgEl.naturalHeight) return;

    const isMobile = window.innerWidth <= 768;
    const fitScale = Math.min(
      (wrapperEl.clientWidth * (isMobile ? 0.95 : 0.9)) / imgEl.naturalWidth,
      (wrapperEl.clientHeight * (isMobile ? 0.8 : 0.85)) / imgEl.naturalHeight,
      1
    );
    fitWidth = imgEl.naturalWidth * fitScale;
    fitHeight = imgEl.naturalHeight * fitScale;
    applyTransform();
  }

  function applyTransform() {
    if (!stageEl) return;

    // Clamp user relative scale
    scale = Math.min(Math.max(scale, MIN_SCALE), MAX_SCALE);

    const totalScale = scale * baseScale;
    const imageWidth = Math.round(fitWidth * totalScale);
    const imageHeight = Math.round(fitHeight * totalScale);
    imgEl.style.width = `${imageWidth}px`;
    imgEl.style.height = `${imageHeight}px`;

    // If totalScale <= 1.0 and scale === 1.0, reset translation
    if (totalScale <= 1.0) {
      translateX = 0;
      translateY = 0;
    } else {
      // Clamp translation to keep image reasonably in frame
      const maxTranslateX = Math.max(0, (imageWidth - wrapperEl.clientWidth) / 2);
      const maxTranslateY = Math.max(0, (imageHeight - wrapperEl.clientHeight) / 2);

      translateX = Math.min(Math.max(translateX, -maxTranslateX), maxTranslateX);
      translateY = Math.min(Math.max(translateY, -maxTranslateY), maxTranslateY);
    }

    stageEl.style.transform = `translate(${Math.round(translateX)}px, ${Math.round(translateY)}px)`;

    if (totalScale > 1.0) {
      stageEl.classList.add('is-zoomed');
    } else {
      stageEl.classList.remove('is-zoomed');
    }

    const resetBtn = modalEl.querySelector('.univ-image-modal__zoom-reset');
    if (resetBtn) {
      resetBtn.textContent = `${Math.round(scale * 100)}%`;
    }
  }

  function resetZoom() {
    scale = 1.0;
    translateX = 0;
    translateY = 0;
    applyTransform();
  }

  function setZoom(newScale, originX, originY) {
    const oldScale = scale;
    scale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);

    if (originX !== undefined && originY !== undefined && stageEl) {
      const rect = stageEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = originX - centerX;
      const deltaY = originY - centerY;

      const scaleRatio = scale / oldScale - 1;
      translateX -= deltaX * scaleRatio;
      translateY -= deltaY * scaleRatio;
    }

    applyTransform();
  }

  function openImageModal(src, options) {
    if (!src) return;
    ensureModalDOM();

    options = options || {};
    const isMobile = window.innerWidth <= 768;
    if (isMobile && options.mobileScale) {
      baseScale = parseFloat(options.mobileScale) || 1.0;
    } else if (!isMobile && options.desktopScale) {
      baseScale = parseFloat(options.desktopScale) || 1.0;
    } else if (options.initialScale) {
      baseScale = parseFloat(options.initialScale) || 1.0;
    } else {
      baseScale = 1.0;
    }

    modalEl.classList.add('is-loading');
    imgEl.classList.add('is-loading');

    imgEl.onload = function () {
      fitImage();
      modalEl.classList.remove('is-loading');
      imgEl.classList.remove('is-loading');
    };

    imgEl.onerror = function () {
      modalEl.classList.remove('is-loading');
      imgEl.classList.remove('is-loading');
    };

    imgEl.src = src;

    resetZoom();

    modalEl.classList.add('is-open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('univ-image-modal-open');
  }

  function closeImageModal() {
    if (!modalEl) return;
    modalEl.classList.remove('is-open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('univ-image-modal-open');
    resetZoom();
  }

  function getDistance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function attachEvents() {
    window.addEventListener('resize', function () {
      if (modalEl.classList.contains('is-open')) fitImage();
    });

    // Esc key close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalEl && modalEl.classList.contains('is-open')) {
        closeImageModal();
      }
    });

    // Control bar button actions
    modalEl.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.getAttribute('data-action');
      if (action === 'close') {
        closeImageModal();
      } else if (action === 'zoom-in') {
        setZoom(scale + 0.25);
      } else if (action === 'zoom-out') {
        setZoom(scale - 0.25);
      } else if (action === 'zoom-reset') {
        resetZoom();
      }
    });

    // Mouse wheel zoom
    wrapperEl.addEventListener('wheel', function (e) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 0.15 : -0.15;
      setZoom(scale + zoomFactor, e.clientX, e.clientY);
    }, { passive: false });

    // Pointer / Mouse Down
    wrapperEl.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return; // Main button only

      tapStartX = e.clientX;
      tapStartY = e.clientY;

      const totalScale = scale * baseScale;
      if (totalScale > 1.0 && (e.target === imgEl || stageEl.contains(e.target))) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialTranslateX = translateX;
        initialTranslateY = translateY;
        stageEl.classList.add('is-dragging');
        e.preventDefault();
      }
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      translateX = initialTranslateX + dx;
      translateY = initialTranslateY + dy;

      applyTransform();
    });

    window.addEventListener('mouseup', function (e) {
      if (isDragging) {
        isDragging = false;
        if (stageEl) stageEl.classList.remove('is-dragging');
      }

      // Tap on empty space / backdrop to close
      const dist = Math.hypot(e.clientX - tapStartX, e.clientY - tapStartY);
      if (dist < 8) {
        // Check if user clicked on backdrop or outside image/controls
        if (e.target === backdropEl || e.target === wrapperEl) {
          closeImageModal();
        }
      }
    });

    // Double-click to zoom
    stageEl.addEventListener('dblclick', function (e) {
      if (scale === 1.0) {
        setZoom(DEFAULT_ZOOM, e.clientX, e.clientY);
      } else {
        resetZoom();
      }
    });

    // Touch Events (Mobile/Tablet Pinch & Pan & Tap to Close)
    wrapperEl.addEventListener('touchstart', function (e) {
      if (e.touches.length === 2) {
        // Pinch zoom start
        initialPinchDistance = getDistance(e.touches[0], e.touches[1]);
        initialPinchScale = scale;
      } else if (e.touches.length === 1) {
        const touch = e.touches[0];
        tapStartX = touch.clientX;
        tapStartY = touch.clientY;

        // Check for double tap
        const now = Date.now();
        if (now - lastTapTime < 300) {
          if (scale === 1.0) {
            setZoom(DEFAULT_ZOOM, touch.clientX, touch.clientY);
          } else {
            resetZoom();
          }
          lastTapTime = 0;
          return;
        }
        lastTapTime = now;

        const totalScale = scale * baseScale;
        if (totalScale > 1.0) {
          isDragging = true;
          startX = touch.clientX;
          startY = touch.clientY;
          initialTranslateX = translateX;
          initialTranslateY = translateY;
        }
      }
    }, { passive: true });

    wrapperEl.addEventListener('touchmove', function (e) {
      if (e.touches.length === 2) {
        // Pinch zoom move
        const currentDistance = getDistance(e.touches[0], e.touches[1]);
        if (initialPinchDistance > 0) {
          const pinchScale = (currentDistance / initialPinchDistance) * initialPinchScale;
          const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
          const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
          setZoom(pinchScale, midX, midY);
        }
        e.preventDefault();
      } else if (e.touches.length === 1 && isDragging) {
        // Touch drag pan
        const touch = e.touches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;

        translateX = initialTranslateX + dx;
        translateY = initialTranslateY + dy;

        applyTransform();
        e.preventDefault();
      }
    }, { passive: false });

    wrapperEl.addEventListener('touchend', function (e) {
      if (e.touches.length === 0) {
        isDragging = false;

        const touch = e.changedTouches[0];
        if (touch) {
          const dist = Math.hypot(touch.clientX - tapStartX, touch.clientY - tapStartY);
          if (dist < 8) {
            // Tap on backdrop / outside stage closes modal
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            if (target === backdropEl || target === wrapperEl) {
              closeImageModal();
            }
          }
        }
      }
    }, { passive: true });
  }

  // Delegated click listener on document for data attributes
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-image-modal], [data-open-image-modal], [data-modal-image]');
    if (!trigger) return;

    const imageUrl =
      trigger.getAttribute('data-image-modal') ||
      trigger.getAttribute('data-open-image-modal') ||
      trigger.getAttribute('data-modal-image');

    if (imageUrl) {
      e.preventDefault();
      const options = {
        desktopScale: trigger.getAttribute('data-scale-desktop') || trigger.getAttribute('data-initial-scale-desktop') || null,
        mobileScale: trigger.getAttribute('data-scale-mobile') || trigger.getAttribute('data-initial-scale-mobile') || null
      };
      openImageModal(imageUrl, options);
    }
  });

  // Export to global window scope for universal programmatic access
  window.openImageModal = openImageModal;
  window.closeImageModal = closeImageModal;
  window.UniversalImageModal = {
    open: openImageModal,
    close: closeImageModal
  };
})();
