var introPosition = 1;
let temp;

// elements
const introElement = document.querySelector(".intro");
const introInsightsElement = document.querySelector(".intro-insights");
const introInsightsList = document.querySelectorAll(".intro-insights-insight");
const introText = document.querySelector(".intro-text");
const introImg = document.querySelector(".intro-img");
const introTexts = [
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in consectetur arcu. Duis ultrices aliquam mauris sed pretium. Maecenas libero. ",
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam varius et nulla at aliquam. Suspendisse potenti. Sed fringilla neque id. ",
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultricies vulputate ligula, ac placerat lectus placerat ut. Curabitur at sem. "
];

const ceoFigure = document.querySelector(".ceo-figure");
const ceoImg = document.querySelector(".ceo-figure-img");
const ceoText = document.querySelector(".ceo-figure-text");
const ceoButton = document.querySelector(".ceo-figure-text-author-link");

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

window.onload = () => {
	introChange();
	manipulateElements();
	validateEmail();
	loadCaptions();
	showModal();
}

window.onresize = () => {
	manipulateElements();
}

introInsightsList.forEach(e => {
	e.addEventListener("click", (e) => {
		introChange(e.target);
	})
})

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

	introText.innerText = introTexts[introPosition];

}

$('.counting').each(function () {
	var $this = $(this),
		countTo = $this.attr('data-count');
	$({
		countNum: $this.text()
	}).animate({
			countNum: countTo
		},
		{
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
	modalBS.show();
}

const hideModal = () => {
	modalBS.hide();
}