var introPosition = 1;
var isModalVisible;
let temp;

// elements
const html = document.querySelector("html");

const introElement = document.querySelector(".intro");
const introInsightsElement = document.querySelector(".intro-insights");
const introInsightsList = document.querySelectorAll(".intro-insights-insight");
const introInsightsMarkers = document.querySelectorAll(".intro-insights-insight-marker");
const introInsightsLines = document.querySelectorAll(".intro-insights-insight-line");
const introText = document.querySelector(".intro-text");
const introImg = document.querySelector(".intro-img");
const introTexts = [
	"Unikátní online portál Energobanking zjednodušuje a urychluje přepis energií.<br /><br />Administrativu vyřešíme za vás.",
	"Získejte pasivní příjem z přepisu energií u vašich klientů. Služba přepisu je ZDARMA.<br /><br />Neplatíte žádné registrační poplatky.",
	"Vaše rozhodnutí přepsat energie s FREE for YOU uspoří drahocenný čas a sníží náklady na energie.<br /><br />Průměrná roční úspora klienta je 3 769 Kč."
];

const ceoFigure = document.querySelector(".ceo-figure");
const ceoImg = document.querySelector(".ceo-figure-img");
const ceoText = document.querySelector(".ceo-figure-text");
const ceoButton = document.querySelector(".ceo-figure-text-author-link");

const numbers = document.querySelector(".numbers");
const numbersData = document.querySelectorAll(".numbers-item-number");

const brokersElement = document.querySelector(".brokers");

const portalInfo = document.querySelector(".portal-info");
const portalSubheading = document.querySelector(".portal-info-subheading");
const portalForm = document.querySelector(".portal-info-form");
const portalCarousel = document.querySelector(".portal-box");
const portalFigures = document.querySelectorAll(".portal-images-figure");

const infoSubmitButton = document.querySelector(".info-text-form-submit");

const exampleSubmitButton = document.querySelector(".example-text-form-submit");

const modal = document.querySelector(".modal");
const modalBS = new bootstrap.Modal(modal);

var letterize;

const introChange = (e) => {
	let introHeading;
	let index;

	if (e === undefined) {
		introElement.classList.add(`i-${introPosition}`);
	} else {
		index = e.className.match(/e-\d/)[0].substr(-1);
		introElement.classList.remove(`i-${introPosition}`);
		introPosition = index;
		introElement.classList.add(`i-${index}`);
	}

	introImg.removeAttribute("src");

	let imageFileName;
	let imagePath;
	introHeading = introInsightsElement.children[introPosition].innerText;
	imageFileName = introHeading.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replaceAll(" ", "-")
		.toLowerCase();
	imageFileName = `${imageFileName}.svg`;
	imagePath = `./assets/${imageFileName}`;

	introImg.setAttribute("src", imagePath)
	introImg.setAttribute("alt", introHeading)

	introText.innerHTML = introTexts[introPosition];
}

introInsightsList.forEach(e => {
	e.addEventListener("click", (e) => {
		introChange(e.target);
	})
})

introInsightsMarkers.forEach(e => {
	e.addEventListener("click", (e) => {
		introChange(e.target.parentElement)
	})
})

introInsightsLines.forEach(e => {
	e.addEventListener("click", (e) => {
		introChange(e.target.parentElement)
	})
})

const animateNumbers = () => {
	$('.counting').each(function () {
		var $this = $(this),
			countTo = $this.attr('data-count');
		$({
			countNum: $this.text()
		}).animate({
			countNum: countTo
		}, {
			duration: 3000,
			easing: 'linear',
			step: function () {
				if (letterize != undefined) {
					letterize.deletterize();
				}
				$this.text(Math.floor(this.countNum));
				letterize = new Letterize({
					targets: ".numbers-item-number",
					className: "numbers-item-number-numeral"
				})

			},
			complete: function () {
				$this.text(this.countNum);
				letterize.deletterize();
				letterize = new Letterize({
					targets: ".numbers-item-number",
					className: "numbers-item-number-numeral"
				})
			}

		});
	});
}

const numbersInView = () => {
	if (numbers.getBoundingClientRect().top <= window.innerHeight && !isModalVisible) {
		numbersData.forEach(e => {
			e.style.display = "block";
		})
		animateNumbers();
	} else {
		numbersData.forEach(e => {
			e.style.display = "none";
		})
	}
}

document.addEventListener("scroll", numbersInView);

const validateTel = () => {
	const rgx = /^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/;
	let tel = document.querySelector(".info-text-form-tel").value;
	let valid = rgx.test(tel);
	if (valid && !infoSubmitButton.classList.contains("enabled")) {
		infoSubmitButton.classList.replace("disabled", "enabled");
		infoSubmitButton.disabled = false;
	} else if (!valid && infoSubmitButton.classList.contains("enabled")) {
		infoSubmitButton.classList.replace("enabled", "disabled");
		infoSubmitButton.disabled = true;
	}
}

const validateEmail = () => {
	const rgx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let email = document.querySelector(".example-text-form-email").value;
	let valid = rgx.test(email);
	if (valid && !exampleSubmitButton.classList.contains("enabled")) {
		exampleSubmitButton.classList.replace("disabled", "enabled");
		exampleSubmitButton.disabled = false;
	} else if (!valid && exampleSubmitButton.classList.contains("enabled")) {
		exampleSubmitButton.classList.replace("enabled", "disabled");
		exampleSubmitButton.disabled = true;
	}
}

const manipulateElements = () => {
	if (window.innerWidth > 1400) {

	}
	if (window.innerWidth > 1200) {

	}
	if (window.innerWidth > 992) {
		ceoImg.style.height = `${ceoText.offsetHeight}px`;
		ceoText.appendChild(ceoButton);
	} else {
		ceoImg.style.removeProperty("height");
		ceoFigure.appendChild(ceoButton);
	}
	if (window.innerWidth > 768) {

	} else {

	}
	if (window.innerWidth > 576) {
		portalCarousel.style.removeProperty("width");
	} else {
		portalCarousel.style.width = `${portalForm.offsetWidth + 35}px`;
	}
}

const loadCaptions = () => {
	portalFigures.forEach(e => {
		temp = e.children[1];
		e.setAttribute("data-caption", temp.innerText);
	})
}

const showModal = () => {
	if (localStorage.isModalClosed || location.hash == '#enter') return;
	modalBS.show();
	isModalVisible = true;
	html.style.overflowY = "hidden";
}

const hideModal = () => {
	localStorage.setItem("isModalClosed", "1");
	modalBS.hide();
	isModalVisible = false;
	html.style.overflowY = "scroll";
	numbersInView();
}

window.onload = () => {
	introChange();
	manipulateElements();
	validateEmail();
	loadCaptions();
	showModal();
	numbersInView();
}

window.onresize = () => {
	manipulateElements();
}

//burger
const mobileNav = document.querySelector(".header-navbar-nav--small");
let isNavOpen = false;

openNav = () => {
    mobileNav.classList.remove("is-closed");
    mobileNav.classList.add("is-opened");
	isNavOpen = true;
}

closeNav = () => {
    mobileNav.classList.remove("is-opened");
    mobileNav.classList.add("is-closed");
	isNavOpen = false;
}

$(".js-mailform").submit(function(e) {
	e.preventDefault();
	$t = $(this);
	$t.addClass("is-loading");
	$.ajax({
		type: 'POST',
		url: '/forms.php',
		data: { type: 'mail', val: $(".js-mail").val() },
		success: function() {
			alert('Děkujeme za odeslání. Brzy Vás budeme kontaktovat.')
		},
		error: function() {
			alert('Chyba')
		},
		complete: function() {
			$t.removeClass("is-loading")
		}

	})

})

$(".js-telform").submit(function (e) {
	e.preventDefault();
	$t = $(this);
	$t.addClass("is-loading");
	$.ajax({
		type: 'POST',
		url: '/forms.php',
		data: { type: 'tel', val: $(".js-tel").val() },
		success: function () {
			alert('Děkujeme za odeslání. Brzy Vás budeme kontaktovat.')
		},
		error: function () {
			alert('Chyba')
		},
		complete: function () {
			$t.removeClass("is-loading")
		}
	})

})