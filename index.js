document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider-inner');
  const progressBar = document.querySelector('.progress-bar-inner');
  const innerWidth = Array.from(slider.children).reduce((acc, elem) => acc + +elem.clientWidth, 0);

  let sliderGrabbed = false;

  showScrollBar();

  window.addEventListener('resize', () => {
    showScrollBar();
  });

  slider.parentElement.addEventListener('scroll', (e) => {
    progressBar.style.width  = `${getScrollProgress()}%`
  })

  slider.addEventListener('mousedown', (e) => {
    sliderGrabbed = true;
    slider.style.cursor = 'grabbing';
  })

  slider.addEventListener('mouseup', (e) => {
    sliderGrabbed = false;
    slider.style.cursor = 'grab';
  })

  slider.addEventListener('mouseleave', (e) => {
    sliderGrabbed = false;
  })

  slider.addEventListener('mousemove', (e) => {
    if(sliderGrabbed){
      slider.parentElement.scrollLeft -= e.movementX;
    }
  })

  slider.addEventListener('wheel', (e) => {
    e.preventDefault();
    slider.parentElement.scrollLeft += e.deltaY;
  })

  function getScrollProgress() {
    return ((slider.parentElement.scrollLeft / (slider.parentElement.scrollWidth - slider.parentElement.clientWidth) ) * 100);
  }

  function showScrollBar() {
    if (innerWidth <= window.screen.width) {
      progressBar.parentElement.classList.add('hidden');
    } else {
      progressBar.parentElement.classList.remove('hidden');
    }
  }
})

