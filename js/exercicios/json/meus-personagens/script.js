let header = document.querySelector("header")
let section = document.querySelector("section")

let request = new XMLHttpRequest()
request.open("GET", "superheroes.json")
request.responseType = "json"
request.send()
request.onload = function () {
    let superHeroes = request.response
    atualizarCabeçalho(superHeroes)
    atualizarSeção(superHeroes)
}

function atualizarCabeçalho(jsonObj) {
    let h1 = document.createElement("h1")
    h1.textContent = "Ordem Paranormal"
    h1.setAttribute("class", "titulo-principal")
    header.appendChild(h1)

    let p = document.createElement("p")
    p.textContent = `Organização: ${jsonObj.nomeGrupo} // Formados em: ${jsonObj.formacao}`
    header.appendChild(p)
} 

function atualizarSeção(jsonObj) {
    let personagens = jsonObj.membros
    for (let pos in jsonObj.membros) {
        let article = document.createElement("article")

        let h2 = document.createElement("h2")
        h2.textContent = personagens[pos].nome[0] + " " + personagens[pos].nome[personagens[pos].nome.length - 1]

        let p1 = document.createElement("p")
        p1.innerHTML = `<strong>Classe: </strong> ${personagens[pos].classe}`
        let p2 = document.createElement("p")
        p2.innerHTML = `<strong>Trilha: </strong> ${personagens[pos].trilha}`
        let p3 = document.createElement("p")
        p3.innerHTML = `<strong>Idade: </strong> ${personagens[pos].idade}`
        let p4 = document.createElement("p")
        p4.innerHTML = `<strong>Afinidade: </strong> ${personagens[pos].afinidade}`
        let p5 = document.createElement("p")
        p5.innerHTML = "<strong>Habilidades:</strong>"
        let ul = document.createElement("ul")
        for (let posi in personagens[pos].habilidades) {
            let li = document.createElement("li")
            li.textContent = personagens[pos].habilidades[posi]
            ul.appendChild(li)
        }
        
        article.appendChild(h2)
        article.appendChild(p1)
        article.appendChild(p2)
        article.appendChild(p3)
        article.appendChild(p4)
        article.appendChild(p5)
        article.appendChild(ul)
        section.appendChild(article)
    }
}