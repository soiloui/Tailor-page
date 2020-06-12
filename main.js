// NAVIGATION HANDLING
const menu_BTN = document.querySelector('.menu-btn');
const nav_NAV = document.querySelector('.nav');

menu_BTN.addEventListener('click', () => {
	menu_BTN.classList.toggle('menu-btn--active');
	nav_NAV.classList.toggle('nav--active');
});

// SMOOTH SCROLL
function smoothScroll(target, duration) {
	const startPosition = window.pageYOffset;
	const targetPosition = target.getBoundingClientRect().top + window.scrollY;
	const distance = targetPosition - startPosition;
	let startTime = null;

	function animationScroll(currentTime) {
		if (startTime === null) startTime = currentTime;

		const timeElapsed = currentTime - startTime;
		const run = ease(timeElapsed, startPosition, distance, duration);
		window.scrollTo(0, run);

		if (timeElapsed < duration) requestAnimationFrame(animationScroll);
	}

	function ease(t, b, c, d) {
		t /= d / 2;
		if (t < 1) return (c / 2) * t * t * t + b;
		t -= 2;
		return (c / 2) * (t * t * t + 2) + b;
	}

	requestAnimationFrame(animationScroll);
}

const elementsScroll_DOM = document.querySelectorAll('.smooth-scroll');

elementsScroll_DOM.forEach((element) => {
	element.addEventListener('click', function () {
		const linkDestiny = element.getAttribute('href');
		const linkElement = document.querySelector(`${linkDestiny}`);
		smoothScroll(linkElement, 800);
	});
});

//PRICING
const pricing_BTN = document.querySelectorAll('.pricing-button');
const pricing_DOM = document.querySelector('.pricing');

pricing_BTN.forEach((button) => {
	button.addEventListener('click', () => {
		pricing_DOM.classList.toggle('pricing--active');
	});
});

// GALLERY
const gallery_DIV = document.querySelector('.gallery');
const close_ICO = gallery_DIV.querySelector('.close');
const moveLeft_ICO = gallery_DIV.querySelector('.left');
const moveRight_ICO = gallery_DIV.querySelector('.right');

const gallery_BTN = document.querySelector('.gallery-button');
let galleryItems_DOM = gallery_DIV.querySelectorAll('.gallery__item');

let galleryContetLoaded = false;

hideGallery = () => {
	gallery_DIV.querySelector('.gallery__item').style.opacity = 0;
	gallery_DIV.classList.remove('gallery--active');
	close_ICO.removeEventListener('click', hideGallery);
	moveLeft_ICO.removeEventListener('click', swipeLeft);
	moveRight_ICO.removeEventListener('click', swipeRight);
	gallery_DIV.querySelector('.gallery__item--active').classList.remove('gallery__item--active');
	galleryItems_DOM[0].classList.add('gallery__item--active');
	galleryOpenListener();
};
showGallery = () => {
	gallery_BTN.removeEventListener('click', showGallery);
	galleryActivation();
};
loadContentGallery = () => {
	galleryContetLoaded = true;
	const frag = document.createDocumentFragment();
	const totalWomenModels = 7;
	const totalMenModles = 6;
	const maxTotal = 7;

	for (let i = 1; i <= maxTotal; i++) {
		if (i <= totalWomenModels) {
			const womenElement = document.createElement('div');
			womenElement.classList.add('gallery__item');
			if (i == 1) womenElement.classList.add('gallery__item--active');
			const womenPhoto = document.createElement('img');
			womenPhoto.classList.add('gallery__image');
			womenPhoto.src = './resources/images/gallery/0_thumbnail.svg';
			womenPhoto.dataset.src = `./resources/images/gallery/woman_${i}_1000w.jpg`;
			womenPhoto.dataset.srcset = `./resources/images/gallery/woman_${i}_600w.jpg 600w, ./resources/images/gallery/woman_${i}_1000w.jpg 1000w, ./resources/images/gallery/woman_${i}_2000w.jpg 2000w`;
			womenPhoto.sizes = '80vw';
			womenPhoto.alt = `women model ${i}`;
			womenElement.appendChild(womenPhoto);
			frag.appendChild(womenElement);
		}

		if (i <= totalMenModles) {
			const menElement = document.createElement('div');
			menElement.classList.add('gallery__item');
			const menPhoto = document.createElement('img');
			menPhoto.classList.add('gallery__image');
			menPhoto.src = './resources/images/gallery/0_thumbnail.svg';
			menPhoto.dataset.src = `./resources/images/gallery/men_${i}_1000w.jpg`;
			menPhoto.dataset.srcset = `./resources/images/gallery/men_${i}_600w.jpg 600w, ./resources/images/gallery/men_${i}_1000w.jpg 1000w, ./resources/images/gallery/men_${i}_2000w.jpg 2000w`;
			menPhoto.sizes = '80vw';
			menPhoto.alt = `men model ${i}`;
			menElement.appendChild(menPhoto);
			frag.appendChild(menElement);
		}
	}

	gallery_DIV.firstElementChild.appendChild(frag);
	galleryItems_DOM = gallery_DIV.querySelectorAll('.gallery__item');
};

galleryOpenListener = () => {
	gallery_BTN.addEventListener('click', showGallery);
};
galleryCloseListener = () => {
	close_ICO.addEventListener('click', hideGallery);
};

galleryActivation = () => {
	if (galleryContetLoaded == false) loadContentGallery();

	gallery_DIV.classList.add('gallery--active');

	let position = 0;
	let opacIsAnimating = false;
	let opacInterval = null;

	opacAnimation = () => {
		if (opacIsAnimating === true) {
			clearInterval(opacInterval);
			opacIsAnimating == false;
		}

		let opac = 0;
		opacInterval = setInterval(frame, 23);
		opacIsAnimating = true;

		function frame() {
			if (opac >= 1) {
				opacIsAnimating = false;
				clearInterval(opacInterval);
			} else {
				opac += 0.05;
				gallery_DIV.querySelector('.gallery__item--active').style.opacity = opac;
			}
		}
	};

	swipe = (direction) => {
		const acutalItem = gallery_DIV.querySelector('.gallery__item--active');
		gallery_DIV.querySelector('.gallery__item').style.opacity = 0;

		if (direction == 'right') {
			if (position < galleryItems_DOM.length - 1) {
				const itemToShow = acutalItem.nextElementSibling;
				acutalItem.classList.remove('gallery__item--active');
				itemToShow.classList.add('gallery__item--active');
				itemToShow.src = itemToShow.dataset.src;
				position++;
				loadImage();
			}
		} else if (direction == 'left') {
			if (position > 0) {
				const itemToShow = acutalItem.previousElementSibling;
				acutalItem.classList.remove('gallery__item--active');
				itemToShow.classList.add('gallery__item--active');
				position--;
			}
		}

		opacAnimation();
	};

	loadImage = () => {
		const acutalImage = gallery_DIV.querySelector('.gallery__item--active').firstElementChild;
		if (!acutalImage.hasAttribute('src')) {
			acutalImage.src = acutalImage.dataset.src;
			acutalImage.srcset = acutalImage.dataset.srcset;
		} else {
			if (acutalImage.getAttribute('src') != acutalImage.getAttribute('data-src')) {
				acutalImage.src = acutalImage.dataset.src;
				acutalImage.srcset = acutalImage.dataset.srcset;
			}
		}
	};

	loadImage();
	opacAnimation();
	galleryCloseListener();

	moveLeft_ICO.addEventListener(
		'click',
		(swipeLeft = () => {
			swipe('left');
		})
	);
	moveRight_ICO.addEventListener(
		'click',
		(swipeRight = () => {
			swipe('right');
		})
	);
};

if (gallery_DIV.classList.contains('gallery--active')) {
	galleryCloseListener();
	galleryActivation();
} else {
	galleryOpenListener();
}
