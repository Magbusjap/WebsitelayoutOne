(function() {
    // scroller-products
    const scroller = document.querySelector('.scroller-products__scroller');
    const prevBtn  = document.querySelector('.btn.prev');
    const nextBtn  = document.querySelector('.btn.next');
    const scrollAmount = scroller.clientWidth * 0.8;
    let isDown = false;
    let startX;
    let scrollLeft;

    prevBtn.addEventListener('click', () => {
        scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
        scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    scroller.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft')  prevBtn.click();
    });

    scroller.addEventListener('mousedown', (e) => {
        isDown = true;
        scroller.classList.add('active');
        startX = e.pageX - scroller.offsetLeft;
        scrollLeft = scroller.scrollLeft;
    });
    scroller.addEventListener('mouseleave', () => {
        isDown = false;
        scroller.classList.remove('active');
    });
    scroller.addEventListener('mouseup', () => {
        isDown = false;
        scroller.classList.remove('active');
    });
    scroller.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scroller.offsetLeft;
        const walk = (x - startX) * 1.5; //scroll-fast
        scroller.scrollLeft = scrollLeft - walk;
    });

    window.addEventListener('load', () => {
        const products = document.querySelectorAll('.product');
        if (products.length >= 2) {
            console.log('Height diff:', Math.abs(products[0].offsetHeight - products[1].offsetHeight), 'px');
        }
    });
    // end scroller-products
    // animation of slides
    const imgs = Array.from(document.querySelectorAll('.discover__image img'));
    let current = 0;

    setInterval(() => {
        imgs.forEach((img, i) => {
            img.classList.remove('discover__img--front');
            img.classList.remove('discover__img--back2');
            img.classList.remove('discover__img--back1');
    }); 

    const prev = (current - 1 + imgs.length) % imgs.length;
    const next = (current + 1) % imgs.length;

    imgs[prev].classList.add('discover__img--back1');
    imgs[current].classList.add('discover__img--front');
    imgs[next].classList.add('discover__img--back2');

    current = next;
    }, 2000);

    
})();

//=======================================



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

