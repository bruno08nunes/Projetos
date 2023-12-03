Array.prototype.meuFilter = function (funcao) {
    const novoArray = [];
    for (let pos = 0; pos < this.length; pos++) {
        const itemArr = this[pos];
        if (funcao(itemArr, pos, this)) {
            novoArray.push(itemArr);
        }
    }
    return novoArray;
}

const maior10 = [5, 10, 7, 13, 22, 15].meuFilter( (element) => {
    return element > 10;
})

console.log(maior10)

Array.prototype.meuReduce = function (funcao, valorPrevio) {
    let valorInicial;
    for (let pos = 0; pos < this.length - 1; pos++) {
        if (valorPrevio === undefined) {
            if (valorInicial === undefined) {
                valorInicial = this[pos];
            }
            valorInicial = funcao(valorInicial, this[pos + 1]);
        }
    }
    return valorInicial
}

const soma = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].meuReduce( (prevElement, element) => {
    return prevElement * element;
} )

console.log(soma)