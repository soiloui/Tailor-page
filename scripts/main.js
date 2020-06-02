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

const arrows_DOM = document.querySelectorAll('.move-wrapper');
const navLinks_DOM = document.querySelectorAll('.nav__link');

arrows_DOM.forEach((arrow) => {
	arrow.addEventListener('click', function (e) {
		const arrowDestiny = e.target.parentElement.nextElementSibling;
		smoothScroll(arrowDestiny, 800);
	});
});

navLinks_DOM.forEach((link) => {
	link.addEventListener('click', function (e) {
		const linkName = link.dataset.name;
		const linkDestiny = document.querySelector(`#${linkName}`);
		smoothScroll(linkDestiny, 800);
	});
});
