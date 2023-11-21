const inp = document.querySelector("#inpTarefa");
const btnAdd = document.querySelector(".btn_add");
const sectionLista = document.querySelector(".lista");
let numLista = 0;
let numChecados = 0;

btnAdd.addEventListener("click", () => {
    if (inp.value !== "" && inp.value != null) {
        // Div que é a linha
        const linhaLista = document.createElement("div");
        linhaLista.classList.add("linha-lista");

        // Label que tem o input e o texto dentro
        const itemLista = document.createElement("label");
        itemLista.classList.add("item-lista");

        // Input que não aparece
        const inpCheck = document.createElement("input");
        inpCheck.type = "checkbox";
        inpCheck.classList.add("inpCheck");
        inpCheck.id = numLista;

        // Input que aparece
        const spanCheck = document.createElement("span");
        spanCheck.classList.add("spanCheck");
        spanCheck.innerHTML = "&#10003;";
        
        // Texto da label
        const spanTexto = document.createElement("span");
        spanTexto.classList.add("label_texto");
        spanTexto.textContent = inp.value;

        // Botão de deletar
        const btnDel = document.createElement("button");
        btnDel.classList.add("btn_del");
        btnDel.textContent = "Deletar";

        // Colocar os elementos um dentro do outro
        sectionLista.appendChild(linhaLista);
        linhaLista.appendChild(itemLista);
        itemLista.appendChild(inpCheck);
        itemLista.appendChild(spanCheck);
        itemLista.appendChild(spanTexto);
        linhaLista.appendChild(btnDel);

        // Clicar em um item e marcá-lo ou desmarcá-lo
        itemLista.addEventListener("click", (e) => {
            e.preventDefault();
            if (linhaLista.classList.contains("checado")) {
                linhaLista.classList.remove("checado");
                linhaLista.style.order = 0;
            } else {
                linhaLista.classList.add("checado");
                linhaLista.style.order = ++numChecados;
            }
        })

        btnDel.addEventListener("click", () => {
            linhaLista.remove();
        })

        numLista++

        inp.value = "";
        inp.focus();
    } else {
        alert("Digite algo")
    }
})

inp.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        btnAdd.click();
    }
})