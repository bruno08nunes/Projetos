const inp = document.querySelector("#inpTarefa");
const btnAdd = document.querySelector(".btn_add");
const sectionLista = document.querySelector(".lista");
let numLista = 0;
let numChecados = 0;

let db, nomeDB = "tarefas_db", nomeObjectStore = "tarefas_os";
const openRequest = window.indexedDB.open(nomeDB, 1);
openRequest.addEventListener("error", () => console.error("Banco de dados falhou ao abrir."));
openRequest.addEventListener("success", () => {
    db = openRequest.result;
    exibirDados();
});
openRequest.addEventListener("upgradeneeded", e => {
    db = e.target.result;
    const objectStore = db.createObjectStore(nomeObjectStore, {
        keyPath: "id",
        autoIncrement: true,
    });

    objectStore.createIndex("tarefa", "tarefa", { unique: false });
});


btnAdd.addEventListener("click", () => {
    if (inp.value !== "" && inp.value != null) {
        // Adiciona ao banco de dados
        const newItem = { tarefa: inp.value, checado: false };
        const transaction = db.transaction([nomeObjectStore], "readwrite");
        const objectStore = transaction.objectStore(nomeObjectStore);
        objectStore.add(newItem);
        transaction.addEventListener("complete", exibirDados);
        transaction.addEventListener("error", e => console.error("Transação não executada com sucesso" + e));

        // Apaga o input e foca nele
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

const exibirDados = () => {
    const objectStore = db.transaction(nomeObjectStore).objectStore(nomeObjectStore);
    while (sectionLista.firstChild) {
        sectionLista.removeChild(sectionLista.firstChild);
    }
    objectStore.openCursor().addEventListener("success", (e) => {
        const cursor = e.target.result;
        if (cursor) {

            // Div que é a linha
            const linhaLista = document.createElement("div");
            linhaLista.classList.add("linha-lista");
            linhaLista.setAttribute("data-note-id", cursor.value.id);
            if (cursor.value.checado) {
                linhaLista.classList.add("checado");
                linhaLista.style.order = ++numChecados;
            }

            // Label que tem o input e o texto dentro
            const itemLista = document.createElement("label");
            itemLista.classList.add("item-lista");
            itemLista.title = cursor.value.tarefa;

            // Input que não aparece
            const inpCheck = document.createElement("input");
            inpCheck.type = "checkbox";
            inpCheck.classList.add("inpCheck");
            inpCheck.id = ++numLista;

            // Input que aparece
            const spanCheck = document.createElement("span");
            spanCheck.classList.add("spanCheck");
            spanCheck.innerHTML = "&#10003;";

            // Texto da label
            const spanTexto = document.createElement("span");
            spanTexto.classList.add("label_texto");
            spanTexto.textContent = cursor.value.tarefa;

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
                if (linhaLista.classList.toggle("checado")) {
                    linhaLista.style.order = ++numChecados;
                } else {
                    linhaLista.style.order = 0;
                }
                const tarefaID = Number(linhaLista.getAttribute("data-note-id"));
                const transaction = db.transaction([nomeObjectStore], "readwrite");
                const objectStore = transaction.objectStore(nomeObjectStore);
                const getRequest = objectStore.get(tarefaID);
                getRequest.addEventListener("success", () => {
                    const valor = getRequest.result;
                    valor.checado = !valor.checado;
                    objectStore.put(valor);
                });
            })

            // Remover item
            btnDel.addEventListener("click", () => {
                deletarDado(linhaLista);
                linhaLista.remove();
            })

            // Ir para o próximo cursor
            cursor.continue();
        }
    });
}

const deletarDado = linhaLista => {
    const tarefaID = Number(linhaLista.getAttribute("data-note-id"));
    const transaction = db.transaction([nomeObjectStore], "readwrite");
    const objectStore = transaction.objectStore(nomeObjectStore);
    objectStore.delete(tarefaID);
}