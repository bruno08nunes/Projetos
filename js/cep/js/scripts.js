// Pegando Elementos
//Formulário
const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");
// Botão de fechar mensagem
const closeButton = document.querySelector("#close-message");

// Eventos
// Validação de CEP
cepInput.addEventListener("keypress", (e) => {
    const onlyNumber = /\d/;
    if (!onlyNumber.test(e.key)) {
        e.preventDefault();
        return;
    }
})
cepInput.addEventListener("blur", (e) => {
    const onlyNumber = /\d{8}/;
    const inpValue = e.target.value;
    
    if (onlyNumber.test(inpValue)) {
        getAddress(inpValue);
    }
})
// Fechar Mensagem
closeButton.addEventListener("click", () => toggleMessage());

//Não permitir ctrl+v que conténham símbolos e letras
cepInput.addEventListener("paste", (e) => {
    const RegEx = /\d{8}/;
    setTimeout( () => {
        if (!RegEx.test(e.target.value)) {
            e.target.value = "";
        }
    }, 0 )
})

// Funções
// Acessar API e pegar endereço
async function getAddress(cep) {
    toggleLoader();
    cepInput.blur();

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    console.log(data)


    if (data.erro) {
        if (!addressInput.hasAttribute("disabled")) {
            toggleDisabled();
        }
        addressForm.reset();
        toggleLoader();
        toggleMessage("CEP inválido! Tente novamente.");
        return;
    }

    if (addressInput.value === "") {
        toggleDisabled();
    }

    addressInput.value = data.logradouro;
    cityInput.value = data.localidade;
    neighborhoodInput.value = data.bairro;
    regionInput.value = data.uf;

    toggleLoader()
}


// Fechar/abrir o loader
function toggleLoader() {
    const fadeElement = document.querySelector("#fade");
    const loaderElement = document.querySelector("#loader");
    
    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
}

// Fechar/abrir a mensagem
function toggleMessage(msg) {
    const fadeElement = document.querySelector("#fade");
    const messageElement = document.querySelector("#message");
    const paragrafoMessage = document.querySelector("#message p");

    paragrafoMessage.textContent = msg;
    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
}

// Habilitar/desabilitar os inputs para poder digitar
function toggleDisabled() {
    if(regionInput.hasAttribute("disabled")) {
        formInputs.forEach(input => input.removeAttribute("disabled"));
    } else {
        formInputs.forEach( input => input.setAttribute("disabled", "disabled") );
    }
}