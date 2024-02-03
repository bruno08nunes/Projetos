// Mudar a imagem ao clicar
const imgs = document.querySelectorAll(".img");
imgs.forEach((img) => {
    img.addEventListener("dblclick", toggleModal);
    img.addEventListener("click", () => {
        if (img.src.includes("assets/shadow1.webp")) {
            img.src = "assets/shadow.jpg";
        } else {
            img.src = "assets/shadow1.webp";
        }
    });
});

// Mudar cor de fundo
const buttonMudarFundo = document.querySelector("button");

buttonMudarFundo.addEventListener("click", mudarFundo);
let fundo = localStorage.getItem("bgColor") ?? 0;
const fundos = ["#1b1b1b", "#a33f65", "blueviolet"];
function mudarFundo() {
    fundo++;
    localStorage.setItem("bgColor", fundo);
    document.body.style.backgroundColor = fundos[fundo % fundos.length];
    buttonMudarFundo.style.backgroundColor =
        fundos[(fundo + 1) % fundos.length];
}
document.body.style.backgroundColor = fundos[fundo % fundos.length];
buttonMudarFundo.style.backgroundColor = fundos[(fundo + 1) % fundos.length];

// Toggle modal
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-modal");
closeModal.addEventListener("click", toggleModal);

function toggleModal(e) {
    if (e.target.src) {
        const imgModal = document.querySelector(".modal img");
        const figcaption = document.querySelector(".modal figcaption");
        imgModal.src = e.target.src;
        imgModal.alt = e.target.alt;
        figcaption.textContent = e.target.alt
    }
    modal.classList.toggle("fechado");
}
