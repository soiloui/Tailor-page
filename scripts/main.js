const menu_BTN = document.querySelector('.menu-btn');
const nav_NAV = document.querySelector('.nav');

menu_BTN.addEventListener('click', () => {
	menu_BTN.classList.toggle('menu-btn--active');
	nav_NAV.classList.toggle('nav--active');
});
