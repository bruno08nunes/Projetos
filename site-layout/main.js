const barraProgredida = document.querySelectorAll(".barra-progresso div");
barraProgredida.forEach( (barra) => {
    barra.style.width = barra.textContent;
})

const btnHamburguer = document.querySelector(".div-menu-hamburguer");
const hamburguer = document.querySelector(".menu-hamburguer");
btnHamburguer.addEventListener("click", (e) => {
    const dados = window.getComputedStyle(hamburguer);
    if (dados.display === "none") {
        hamburguer.style.display = "block";
    } else {
        hamburguer.style.display = "none";
    }
})
window.onresize = (e) => {
    if (window.innerWidth >= 600) {
        btnHamburguer.style.display = "none";
        hamburguer.style.display = "none";
    } else {
        btnHamburguer.style.display = "block"
    }
}

window.onscroll = (e) => {
    const nav = document.querySelector(".nav-principal");
    const divNav = document.querySelector(".div-nav");
    const coordenadas = divNav.getBoundingClientRect();
    if (coordenadas.y <= -100 && !(nav.classList.contains("nav-scroll"))) {
        nav.classList.add('nav-scroll');
    }
}

const btnTop = document.querySelector(".to-top");
btnTop.addEventListener("click", (e) => {
    window.scrollTo(0, 0)
})

const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const imagens = document.querySelectorAll(".div-imgs img");
imagens.forEach( (imagem) => {
    imagem.addEventListener("click", (e) => {
        modal.style.display = "block";
        backdrop.style.display = "block";

        const img = document.querySelector(".modal img");
        img.src = e.target.src;
        img.alt = e.target.alt;

        const figcaption = document.querySelector(".modal figcaption");
        figcaption.textContent = e.target.alt;
    }
)})
backdrop.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.style.display = "none"
    backdrop.style.display = "none"
})


// .nav-scroll