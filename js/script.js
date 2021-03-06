const log = console.log;

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
      }
      this.getImage();
      const newCarousel = new Carousel;
      newCarousel.viewCarousel();
    }, false);
  };

  getImage() {
    const carouselСontainer = document.querySelector('.carousel__container');
    for (let i = 0; i < this.fileList.length; i++) {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
      if (i == 0) {
        carouselСontainer.insertAdjacentHTML('afterbegin',
                      `<div class="carousel__item">
                        <div class="carousel__image-container">
                          <img class="carousel__image" src="${e.target.result}" alt="">
                        </div>
                      </div>`);
      } else {
        carouselСontainer.insertAdjacentHTML('afterbegin',
                      `<div class="carousel__item carousel__item_hidden">
                        <div class="carousel__image-container">
                          <img class="carousel__image" src="${e.target.result}" alt="">
                        </div>
                      </div>`);
      }
      const newCarousel = new Carousel;
      newCarousel.insertDots();
      }, false);
      reader.readAsDataURL(this.fileList[i]);
    }
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
      
      nextButton.addEventListener('click', () => {
        this.nextItem(carousel);
      });

      prevButton.addEventListener('click', () => {
        this.prevItem(carousel);
      });
    }, false);
  }

  insertDots() {
    const carouselDots = document.querySelector('.carousel__dots');
    const dot = document.createElement('li');
    dot.classList.add('carousel__dot');
    dot.innerHTML = `<button id="carousel__to" type="button" role="tab"></button>`;
    carouselDots.append(dot);
  }

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

    carousel.querySelectorAll('.carousel__item')[item].previousElementSibling != null ?
    this.showItem(carousel, item - 1):
    this.showItem(carousel, carousel.querySelectorAll('.carousel__item').length - 1); 
  }

  showItem(carousel, item) {
    const allCarouselItems = carousel.querySelectorAll('.carousel__item');
    const currentElem = this.currentItem(carousel);
    const carouselDots = document.querySelector('.carousel__dots');
    carouselDots.style.opacity = 1;

    if (allCarouselItems[currentElem] != undefined)
    allCarouselItems[currentElem].classList.add('carousel__item_hidden');
    allCarouselItems[item].classList.remove('carousel__item_hidden');

    if (carousel.querySelector('.carousel__dot.carousel__dot_active') != null)
    carousel.querySelector('.carousel__dot.carousel__dot_active').classList.remove('carousel__dot_active');
    carousel.querySelectorAll('.carousel__dot')[item].classList.add('carousel__dot_active');
  }
  
};

const newFiles = new Files;
newFiles.uploadFiles();