import heroArray from "/JSONdata.json" assert { type: "json" };

document.addEventListener("DOMContentLoaded", () => {
    let pageContent = "";
    let index = 0;
    for (let hero of heroArray) {
        pageContent += `<div class="card">
        <h2 class="hero-name">${hero.name}</h2>
        <div>Вселенная: ${hero.universe}</div>
        <div>Альтер-эго: ${hero.alterego}</div>
        <div>Род деятельности: ${hero.occupation}</div>
        <div>Друзья: ${hero.friends}</div>
        <div>Суперсила: ${hero.superpowers}</div>
        <img src="${hero.url}" class="hero-img"></img>
        <button class="btn" id="btn${index}">Читать подробнее</button>
        <div class="rating" id="${index}">
        <img value="0" src='/assets/images/blank-star.svg'></img>
        <img value="1" src='/assets/images/blank-star.svg'></img>
        <img value="2" src='/assets/images/blank-star.svg'></img>
        <img value="3" src='/assets/images/blank-star.svg'></img>
        <img value="4" src='/assets/images/blank-star.svg'></img></div>
    </div>`;
        index += 1;
    }
    document.getElementById("card-container").innerHTML = pageContent;
    const ratingDiv = document.querySelectorAll(".rating");
    ratingDiv.forEach((div) => {
        const images = div.children;
        const imagesArray = [...images];
        for (let img of imagesArray) {
            img.addEventListener("click", function (evt) {
                addStarRating(evt.target);
            });
        }
    });
    setBtnEvents();
    getStoredRatings();
});

function addStarRating(element) {
    const elValue = element.getAttribute("value");

    const parent = element.parentElement;
    localStorage.setItem(parent.getAttribute("id"), elValue);
    const children = parent.children;

    for (let img of children) {
        if (img.getAttribute("value") <= elValue) {
            img.src = `/assets/images/yellow-star.svg`;
        }
        if (img.getAttribute("value") > elValue) {
            img.src = `/assets/images/blank-star.svg`;
        }
    }
}

//каждый раз брать данные из localStorage
function getStoredRatings() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        const keyItem = document.getElementById(key);
        const valueItem = keyItem.children[value];

        addStarRating(valueItem);
    }
}

function setBtnEvents() {
    const btnArray = document.getElementsByClassName("btn");
    const parent = document.getElementById("text-container");

    const buttons = [...btnArray];
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            let content = `<p>${
                heroArray[btn.getAttribute("id").slice(3)].info
            }</p>`;
            console.log(btn.getAttribute("id").slice(3));
            parent.innerHTML = "";
            parent.innerHTML = content;
            openModal();
        });
    });
}
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const closeModalBtn = document.querySelector(".btn-close");
function openModal() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}
function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
