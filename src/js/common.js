const isSP = window.matchMedia('(max-width: 768px)').matches;

/* global Splide */
const setLogoSlider = () => {
  const splideOptions = {
    arrows: false,
    pagination: false,
    autoWidth: true,
    type: 'loop',
    drag: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    autoScroll: {
      speed: 0.4,
      pauseOnHover: false,
    },
  };

  const sliderIds = ['#slider1', '#slider2'];
  sliderIds.forEach((id) => {
    const target = document.querySelector(id);
    if (target) {
      new Splide(id, splideOptions).mount(window.splide.Extensions);
    }
  });
};

const setExampleSlider = () => {
  const target = document.querySelector('.l-example__slider');
  if (!target) {
    return;
  }

  const exampleSlide = new Splide(target, {
    mediaQuery: 'max',
    type: 'loop',
    perPage: 3,
    perMove: 1,
    focus: 'center',
    updateOnMove: true,
    breakpoints: {
      767: {
        destroy: true,
      },
    },
    classes: {
      prev: 'splide__arrow--prev',
      next: 'splide__arrow--next',
      pagination: 'splide__pagination',
      page: 'splide__pagination__page',
    },
  });
  exampleSlide.mount();
};

const triggerCTA = () => {
  const cta = document.querySelector('.l-cta');
  const hideAreas = document.querySelectorAll('.js-hide-trigger');
  if (!cta || hideAreas.length === 0) {
    return;
  }

  const visibilityMap = new Map();

  const callback = (entries) => {
    entries.forEach((entry) => {
      visibilityMap.set(entry.target, entry.isIntersecting);
    });

    const shouldHide = Array.from(visibilityMap.values()).some((isVisible) => isVisible);

    if (shouldHide) {
      cta.classList.remove('l-cta--fixed');
    } else {
      cta.classList.add('l-cta--fixed');
    }
  };

  const observer = new IntersectionObserver(callback, { threshold: 0 });

  hideAreas.forEach((target) => {
    visibilityMap.set(target, false);
    observer.observe(target);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setLogoSlider();
  setExampleSlider();
  if (isSP) {
    triggerCTA();
  }
});
