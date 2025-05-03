(function() {
    // находим элементы
    const scroller = document.querySelector('.scroller');
    const prevBtn  = document.querySelector('.btn.prev');
    const nextBtn  = document.querySelector('.btn.next');
  
    // шаг прокрутки — 80% от ширины видимой области
    const scrollAmount = scroller.clientWidth * 0.8;
  
    // навешиваем события на кнопки
    prevBtn.addEventListener('click', () => {
      scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  
    // поддержка стрелок на клавиатуре (когда .scroller в фокусе)
    scroller.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') nextBtn.click();
      if (e.key === 'ArrowLeft')  prevBtn.click();
    });
  })();