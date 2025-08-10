handleResize()
window.addEventListener('resize', handleResize);
function handleResize() {
  const content = document.querySelector('.header__content');
  const topInner = document.querySelector('.header__top-inner');
  const inner = document.querySelector('.header__inner');
  if (!content || !topInner || !inner) return;
  if (window.innerWidth < 768) {
    if (!inner.contains(content)) {
      inner.appendChild(content);
    }
  } else {
    if (!topInner.contains(content)) {
      topInner.appendChild(content);
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const headerBurger = document.querySelector('.header__burger');
  const headerCloseBtn = document.querySelector('.header__bottom-close');
  const headerInner = document.querySelector('.header__inner');
  headerBurger.addEventListener('click', () => {
    header.classList.add('header-active');
  });
  headerCloseBtn.addEventListener('click', () => {
    header.classList.remove('header-active');
  });
  document.addEventListener('click', (e) => {
    if (
      header.classList.contains('header-active') &&
      !headerInner.contains(e.target) &&
      !headerBurger.contains(e.target)
    ) {
      header.classList.remove('header-active');
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
    const langWrappers = document.querySelectorAll('.header__lang');
    langWrappers.forEach(langWrapper => {
    const langSelected = langWrapper.querySelector('.header__lang-selected');
    langSelected.addEventListener('click', (e) => {
        e.stopPropagation();
        langWrappers.forEach(wrapper => {
        if (wrapper !== langWrapper) {
            wrapper.classList.remove('active');
        }
        });
        langWrapper.classList.toggle('active');
    });
    });
    document.addEventListener('click', (e) => {
        langWrappers.forEach(langWrapper => {
            if (!langWrapper.contains(e.target)) {
            langWrapper.classList.remove('active');
            }
        });
    });


    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        const title = item.querySelector('.faq__item-title');
        title.addEventListener('click', () => {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                faqItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });
});
let respondSiteSwiper = null;
function initOrDestroySwiper() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
        if (!respondSiteSwiper) {
            respondSiteSwiper = new Swiper(".respond-site-slider", {
                loop: false,
                spaceBetween: 16,
                slidesPerView: 1,
                pagination: {
                    el: '.respond-site-slider--pagination',
                    clickable: true,
                },
            });
        }
    } else {
        if (respondSiteSwiper) {
            respondSiteSwiper.destroy(true, true);
            respondSiteSwiper = null;
        }
    }
}
window.addEventListener("load", initOrDestroySwiper);
window.addEventListener("resize", initOrDestroySwiper);
let respondInternetSlider = new Swiper(".respond-internet-slider", {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1,
    breakpoints: {
        480: {
            spaceBetween: 25,
            slidesPerView: 2,
        },
        768: {
            spaceBetween: 30,
            slidesPerView: 3,
        },
        1000: {
            spaceBetween: 35,
            slidesPerView: 4,
        },
        1280: {
            spaceBetween: 39,
            slidesPerView: 5,
        },
    },
    pagination: {
        el: '.respond-internet-slider--pagination',
        clickable: true,
    },
});
let respondFeedbackSlider = new Swiper(".respond-feedback-slider", {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1,
    breakpoints: {
        768: {
            spaceBetween: 36,
            slidesPerView: 2,
        },
    },
    pagination: {
        el: '.respond-feedback-slider--pagination',
        clickable: true,
    },
});
if(document.querySelector('.reviewsPopup')){
    const reviewsPopup = document.querySelector('.reviewsPopup');
    const reviewsPopupInner = document.querySelector('.reviewsPopup__inner');
    const reviewsPopupClose = document.querySelector('.reviewsPopup__close');
    const reviewsPopupOpen = document.querySelector('.reviewsPopup-open');
    reviewsPopupOpen.addEventListener('click', () => {
        reviewsPopup.classList.add('active');
    });
    function closePopup(event) {
        const isClickOutside = !reviewsPopupInner.contains(event.target);
        const isCloseButton = event.target === reviewsPopupClose;
        const isRemoveImageButton = event.target.closest('.reviewsPopup__form-file--item button');
        if ((isClickOutside || isCloseButton) && !isRemoveImageButton) {
            reviewsPopup.classList.remove('active');
        }
    }

    reviewsPopupClose.addEventListener('click', closePopup);
    reviewsPopup.addEventListener('click', closePopup);
    const stars = document.querySelectorAll('.reviewsPopup__form-stars label');
    const ratingInput = document.querySelector('.reviewsPopup__form-stars input[name="star"]');
    let currentRating = 1;
    ratingInput.value = currentRating;
    updateStarColors(currentRating);
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            currentRating = index + 1;
            ratingInput.value = currentRating;
            updateStarColors(currentRating);
        });
        star.addEventListener('mouseover', () => {
            updateStarColors(index + 1);
        });
        star.addEventListener('mouseout', () => {
            updateStarColors(currentRating);
        });
    });
    function updateStarColors(rating) {
        stars.forEach((star, index) => {
            const path = star.querySelector('svg path');
            if (index < rating) {
                path.setAttribute('fill', '#31BBDC');
            } else {
                path.setAttribute('fill', 'transparent');
            }
        });
    }
    const fileInput = document.querySelector('.reviewsPopup__form-file input[type="file"]');
    const fileLabel = document.querySelector('.reviewsPopup__form-file label');
    const fileContent = document.querySelector('.reviewsPopup__form-file--content');
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                fileLabel.classList.add('hide');
                const item = document.createElement('div');
                item.className = 'reviewsPopup__form-file--item';
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = '';
                const closeButton = document.createElement('button');
                item.appendChild(img);
                item.appendChild(closeButton);
                fileContent.innerHTML = '';
                fileContent.appendChild(item);
                closeButton.addEventListener('click', () => {
                    e.stopPropagation();
                    fileContent.innerHTML = '';
                    fileInput.value = '';
                    fileLabel.classList.remove('hide');
                });
            };
            reader.readAsDataURL(file);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const respondRadios = document.querySelectorAll('.respond__select input[type="radio"]');
    const respondBlocks = document.querySelectorAll('.respond__block');
    respondRadios.forEach(radio => {
      radio.addEventListener('change', function () {
        const value = this.value;
        if (value === 'All') {
          respondBlocks.forEach(block => {
            block.style.display = '';
          });
        } else {
          respondBlocks.forEach(block => {
            if (block.getAttribute('data-respond') === value) {
              block.style.display = '';
            } else {
              block.style.display = 'none';
            }
          });
        }
      });
    });
});



if(document.querySelector('.maintenance__actions')){
    const endDate = new Date(2025, 7, 16, 18, 0, 0); // 10 серпня 2025, 18:00:00
    function updateCountdown() {
        const now = new Date();
        const diff = endDate - now;
        if (diff <= 0) {
            setTime('00', '00', '00', '00');
            clearInterval(timer);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTime(days, hours, minutes, seconds);
    }
    function formatNumber(num) {
        return num.toString().padStart(2, '0');
    }
    function setTime(d, h, m, s) {
        document.getElementById('days').innerHTML = formatNumber(d).split('').map(n => `<span>${n}</span>`).join('');
        document.getElementById('hours').innerHTML = formatNumber(h).split('').map(n => `<span>${n}</span>`).join('');
        document.getElementById('minutes').innerHTML = formatNumber(m).split('').map(n => `<span>${n}</span>`).join('');
        document.getElementById('seconds').innerHTML = formatNumber(s).split('').map(n => `<span>${n}</span>`).join('');
    }
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
}



let moreInfoSlider = new Swiper(".moreInfo__slider", {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1,
    breakpoints: {
        768: {
            spaceBetween: 30,
            slidesPerView: 2,
        },
        1000: {
            spaceBetween: 35,
            slidesPerView: 3,
        },
        1280: {
            spaceBetween: 41,
            slidesPerView: 4,
        },
    },
    pagination: {
        el: '.moreInfo__slider-pagination',
        clickable: true,
    },
});

let reviewsSlider = new Swiper(".reviews__slider", {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1,
    breakpoints: {
        1000: {
            spaceBetween: 30,
            slidesPerView: 2,
        },
        1280: {
            spaceBetween: 30,
            slidesPerView: 4,
        },
    },
    pagination: {
        el: '.reviews__slider-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: ".reviews__slider-next",
        prevEl: ".reviews__slider-prev",
    },
});

let workResultSlider = new Swiper(".workResult__slider", {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1,
    pagination: {
        el: '.workResult__slider-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: ".workResult__next",
        prevEl: ".workResult__prev",
    },
});
if(document.querySelector('.hero__more-title')){
    new CircleType(document.querySelector('.hero__more-title')).radius(55);
}
if(document.querySelector('.maintenance__left-name')){
    new CircleType(document.querySelector('.maintenance__left-name')).radius(90);
}
if(document.querySelector('.procompactor__video-name')){
    new CircleType(document.querySelector('.procompactor__video-name')).radius(56);
}
if(document.querySelector('.hero__more-title')){
    new CircleType(document.querySelector('.hero__more-title')).radius(55);
}
if (document.querySelector('.problems__item-title')) {
    const problemsTitles = document.querySelectorAll('.problems__item-title');
    const radius = window.innerWidth < 768 ? 68 : 90;
    problemsTitles.forEach(title => {
        new CircleType(title).radius(radius);
    });
}
