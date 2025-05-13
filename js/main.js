(function() {
    // scroller-products + Photo slider

// 1) Универсальная инициализация одного блока
function initScroller(root) {
  const scroller = root.querySelector('.blockScroller__scroller');
  const prevBtn  = root.querySelector('.btn.prev');
  const nextBtn  = root.querySelector('.btn.next');
  if (!scroller) return;

  const scrollAmount = scroller.clientWidth * 0.8;
  let isDown = false, startX = 0, scrollLeft = 0;

  prevBtn?.addEventListener('click', () =>
    scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  );
  nextBtn?.addEventListener('click', () =>
    scroller.scrollBy({ left:  scrollAmount, behavior: 'smooth' })
  );

  scroller.addEventListener('mousedown', e => {
    isDown = true;
    scroller.classList.add('active');
    startX     = e.pageX - scroller.offsetLeft;
    scrollLeft = scroller.scrollLeft;
  });
  ['mouseup','mouseleave'].forEach(evt =>
    scroller.addEventListener(evt, () => {
      isDown = false;
      scroller.classList.remove('active');
    })
  );
  scroller.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - scroller.offsetLeft;
    const walk = (x - startX) * 1.5;
    scroller.scrollLeft = scrollLeft - walk;
  });
}

// 2) Для *каждого* блока-обёртки вызываем initScroller
document
  .querySelectorAll('.blockScroller')
  .forEach(wrapper => initScroller(wrapper));
    
})();

//=======================================
(function() {

    //universal block for photos
    function initSlider(root, cfg) {
        const imgs = Array.from(root.querySelectorAll(cfg.imageSelector));
        if (!imgs.length) return;
        let current = 0;

        setInterval(() => {
            imgs.forEach(img => {
                img.classList.remove(cfg.clsFront, cfg.clsBack1, cfg.clsBack2);
            });

            const prev = (current - 1 + imgs.length) % imgs.length;
            const next = (current + 1) % imgs.length;

            imgs[prev].classList.add(cfg.clsBack1);
            imgs[current].classList.add(cfg.clsFront);
            imgs[next].classList.add(cfg.clsBack2);

            current = next;
        }, cfg.interval);
    }

    document
        .querySelectorAll('.block')
        .forEach(root => initSlider(root, {
            imageSelector: '.block__image img',
            clsFront: 'block__img--front',
            clsBack1: 'block__img--back1',
            clsBack2: 'block__img--back2',
            interval: 2000
        }))

})();



//==============================

;(function() {

    const SLIDES_VISIBLE = 2;
    const AUTO_INTERVAL  = 3000;

    //const viewport = document.querySelector('.feedback__viewport');
    const slider   = document.querySelector('.feedback__slider');
    const slides   = Array.from(document.querySelectorAll('.feedback__slide'));
    const dots     = Array.from(document.querySelectorAll('.feedback__dot'));
    const prevBtn  = document.querySelector('.feedback__prev');
    const nextBtn  = document.querySelector('.feedback__next');
  
    const style = getComputedStyle(slides[0]);
    const gap = parseFloat(style.marginRight);
    const slideWidth = slides[0].getBoundingClientRect().width + gap;
  
    let currentIndex = 0, autoTimer;
  
    function goTo(index) {
        const maxIndex = slides.length - SLIDES_VISIBLE;
        if (index < 0) index = maxIndex;
        else if (index > maxIndex) index = 0;
        currentIndex = index;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        updateDots();
    }

    function next() { goTo(currentIndex + 1); }
    function prev() { goTo(currentIndex - 1); }

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(next, AUTO_INTERVAL);
    }
    function stopAuto() {
        if (autoTimer) clearInterval(autoTimer);
    }

    prevBtn.addEventListener('click', () => { prev(); startAuto(); });
    nextBtn.addEventListener('click', () => { next(); startAuto(); });

    function updateDots() {
        dots.forEach((dot,i) => {
            if (i === currentIndex || i === currentIndex + 1) {
                dot.classList.add('feedback__dot--active');
            }
            else {
                dot.classList.remove('feedback__dot--active');
            }
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goTo(index);
            startAuto();
        })
    })

    goTo(0);
    updateDots();
    startAuto();

})();

//=======================================

import { applyTranslations } from './i18n.js';

(function() {
  document.addEventListener('DOMContentLoaded', () => {
    let lang = 'ru';
    const btn = document.getElementById('langToggler');

    async function switchLang() {
      await applyTranslations(lang);
      btn.textContent = lang === 'ru' ? 'EN' : 'RU';
    }

    btn.addEventListener('click', () => {
      lang = lang === 'ru' ? 'en' : 'ru';
      switchLang();
    });

    switchLang(); 
  });
})();