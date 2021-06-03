//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}
function sliders_bild_callback(params) { }
//========================================================================================================================================================
let pageSlider = new Swiper('.page-full', {
	// Свои классы
	wrapperClass: "page-full__wrapper",
	slideClass: "page-full__screen",

	// Вертикальный слайдер
	direction: 'vertical',

	// Количество слайдов для показа
	slidesPerView: 'auto',

	// Включаем параллакс
	parallax: true,


	// Управление клавиатурой
	keyboard: {
		// Включить\выключить
		enabled: true,
		// Включить\выключить
		// только когда слайдер
		// в пределах вьюпорта
		onlyInViewport: true,
		// Включить\выключить
		// управление клавишами
		// pageUp, pageDown
		pageUpDown: true,
	},

	// Управление колесом мыши
	mousewheel: {
		// Чувствительность колеса мыши
		sensitivity: 1,
		// Класс объекта на котором
		// будет срабатывать прокрутка мышью.
		//eventsTarget: ".image-slider"
	},

	// Отключение функционала
	// если слайдов меньше чем нужно
	watchOverflow: true,
	// Скорость
	speed: 700,

	// Обновить свайпер
	// при изменении элементов слайдера
	observer: true,

	// Обновить свайпер
	// при изменении родительских
	// элементов слайдера
	observeParents: true,

	// Обновить свайпер
	// при изменении дочерних
	// элементов слайда
	observeSlideChildren: true,

	// Навигация 
	// Буллеты, текущее положение, прогрессбар
	pagination: {
		el: '.page-full__pagination',
		type: 'bullets',
		clickable: true,
		bulletClass: "page-full__bullet",
		bulletActiveClass: "page-full__bullet--active",
	},

	// Отключаем автоинициализацию
	init: false,

	// События
	on: {
		// Событие инициализации
		init: function () {
			menuSlider();
			setScrollType();
			wrapper.classList.add('_loaded');
		},
		// Событие смены слайда
		slideChange: function () {
			menuSliderRemove();
			menuLinks[pageSlider.realIndex].classList.add('_active');
		},
		resize: function () {
			setScrollType();
		}
	},

});

let screen4Slider = new Swiper('.screen-4__slider', {
	loop: true,
	// effect: 'fade',

	navigation: {
		nextEl: '.screen-4__slider-next',
		prevEl: '.screen-4__slider-prev',
	 },
});

let productDetail = new Swiper('.product-detail__slider', {
	loop: true,
	slidesPerView: 1,

	// effect: 'fade',
	// thumbs
	thumbs: {
		swiper: {
			el: '.product-detail__thumbs',
			slidesPerView: 3,
			direction: 'horizontal',
			spaceBetween: 30,

			breakpoints: {
				768: {
					direction: 'vertical',
				},
			},
		}
	},
});


let wrapper = document.querySelector(".wrapper-full");
let menuLinks = document.querySelectorAll('.menu__link--full');

function menuSlider() {
	if (menuLinks.length > 0) {
		menuLinks[pageSlider.realIndex].classList.add('_active');
		for (let index = 0; index < menuLinks.length; index++) {
			const menuLink = menuLinks[index];
			menuLink.addEventListener("click", function (e) {
				menuSliderRemove();
				pageSlider.slideTo(index, 800);
				menuLink.classList.add('_active');
				e.preventDefault();
			});
		}
	}
}

function menuSliderRemove() {
	let menuLinkActive = document.querySelector('.menu__link--full._active');
	if (menuLinkActive) {
		menuLinkActive.classList.remove('_active');
	}
}

function setScrollType() {
	if (wrapper.classList.contains('_free')) {
		wrapper.classList.remove('_free');
		pageSlider.params.freeMode = false;
	}
	for (let index = 0; index < pageSlider.slides.length; index++) {
		const pageSlide = pageSlider.slides[index];
		const pageSlideContent = pageSlide.querySelector('.content');
		if (pageSlideContent) {
			const pageSlideContentHeight = pageSlideContent.offsetHeight;
			if (pageSlideContentHeight > window.innerHeight) {
				wrapper.classList.add('_free');
				pageSlider.params.freeMode = true;
				
				break;
			}
		}
	}
}

if (wrapper) {
	if (window.innerWidth >= 991.98) {
		pageSlider.init();
	} else {
		wrapper.classList.add("_loaded");
	}
}

