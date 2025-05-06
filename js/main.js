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

