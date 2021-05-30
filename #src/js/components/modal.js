let searchIcon = document.querySelector('.menu__search-icon');
let search = document.querySelector('.search');
let searchClose = document.querySelector('.search__close');
let body = document.querySelector('body');

if (searchIcon) {
	searchIcon.addEventListener("click", function (e) {
		body.classList.add('_lock');
		search.classList.add('_active');
	});
	searchClose.addEventListener("click", function (e) {
		search.classList.remove('_active');
		body.classList.remove('_lock');
	});

	document.documentElement.addEventListener("click", function (e) {
		if (!e.target.closest('.search, .menu__search-icon')) {
			search.classList.remove('_active');
			body.classList.remove('_lock');
		}
	});
}




