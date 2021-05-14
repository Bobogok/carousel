const log = console.log;
const carouselСontainer = document.querySelector('.carousel__container');

class Files {
  constructor() {
    this.inputFiles = document.getElementById('file');
    this.carousel = document.querySelector('.carousel');
    this.uploader = document.querySelector('.uploader');
    this.src = '';
    this.fileList = [];
  }

  uploadFiles() {
    this.inputFiles.addEventListener('change', () => {
      this.carousel.style.display = 'block';
      this.uploader.style.display = 'none';
      for (let i = 0; i < this.inputFiles.files.length; i++) {
        this.fileList.push(this.inputFiles.files[i]);
        this.getImage(this.inputFiles.files[i], i);
      }
      const newCarousel = new Carousel;
      newCarousel.viewCarousel();
    }, false);
  };

  getImage(img, i) {
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      this.src = e.target.result;
      if (i === 0) {
        carouselСontainer.insertAdjacentHTML('afterbegin',
                      `<div class="carousel__item">
                        <div class="carousel__image-container">
                          <img class="carousel__image" src="${this.src}" alt="">
                        </div>
                      </div>`);
      } else {
        carouselСontainer.insertAdjacentHTML('afterbegin',
                      `<div class="carousel__item carousel__item_hidden">
                        <div class="carousel__image-container">
                          <img class="carousel__image" src="${this.src}" alt="">
                        </div>
                      </div>`);
      }
    }, false);
    reader.readAsDataURL(img);
    // const newCarousel = new Carousel;
    // newCarousel.insertDots();
  };
};

class Carousel {

  constructor() {
    this.carouselDots = document.querySelector('.carousel__dots');
    this.allCarouselItems = document.querySelectorAll('.carousel__container');
  }

  viewCarousel() {
    this.allCarouselItems.forEach(carousel => {
      const nextButton = carousel.querySelector('.carousel__next-arrow');
      const prevButton = carousel.querySelector('.carousel__prev-arrow');
      // this.insertDots(carousel);
      // log(document.querySelectorAll('.carousel__item'))
      // log(carousel)
      // this.showItem(carousel, 1);

      nextButton.addEventListener('click', () => {
        this.nextItem(carousel);
      });

      prevButton.addEventListener('click', () => {
        this.prevItem(carousel);
      });
    });
  }

  // insertDots() {
  //   log(document.querySelectorAll('.carousel__item'))
  //   const lengthElems = document.querySelectorAll('.carousel__item').length;
  //   const carouselDots = document.querySelector('.carousel__dots');

  //   for (let i = 0; i < lengthElems; i++) {
  //     const dot = document.createElement('li');
  //     dot.classList.add('carousel__dot');
  //     dot.innerHTML = `<button id="carousel__to${i}" type="button" role="tab"></button>`;
  //     // this.carouselDots.appendChild(dot);
  //     carouselDots.appendChild(dot);
  //   };
  // }

  currentItem(carousel) {
    // TODO Comment
    return [...carousel.querySelectorAll(".carousel__item")]
            .findIndex(item => item.classList.contains('carousel__item_hidden') != true);
  }

  nextItem(carousel) {
    let item = this.currentItem(carousel);

    carousel.querySelectorAll('.carousel__item')[item].nextElementSibling.classList.contains('carousel__item') ?
    this.showItem(carousel, item + 1):
    this.showItem(carousel, 0);
  }

  prevItem(carousel) {
    let item = this.currentItem(carousel);
    log(item);

    carousel.querySelectorAll('.carousel__item')[item].previousElementSibling != null ?
    this.showItem(carousel, item - 1):
    this.showItem(carousel, carousel.querySelectorAll('.carousel__item').length - 1); 
  }

  showItem(carousel, item) {
    const allCarouselItems = carousel.querySelectorAll('.carousel__item');
    const currentElem = this.currentItem(carousel);
    log(currentElem);

    if (allCarouselItems[currentElem] != undefined)
    allCarouselItems[currentElem].classList.add('carousel__item_hidden');
    allCarouselItems[item].classList.remove('carousel__item_hidden');

    // if (carousel.querySelector('.carousel__dot.carousel__dot_active') != null)
    // carousel.querySelector('.carousel__dot.carousel__dot_active').classList.remove('carousel__dot_active');
    // carousel.querySelectorAll('.carousel__dot')[item].classList.add('carousel__dot_active');
  }
  
};

const newFiles = new Files;
newFiles.uploadFiles();