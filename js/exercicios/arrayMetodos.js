// sort()

// const num = [3,1, 5, 4, 2]
// function sortear(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let c = i; c < arr.length; c++) {
//             if (arr[i] > arr[c]) {
//                 let x = arr[i];
//                 arr[i] = arr[c];
//                 arr[c] = x;
//             }
//         }
//     }
//     return arr;
// };

// const num2 = sortear(num);
// console.log(num2);

///////////////////////////////////////////////////////////////////////////////////////////////

// reverse()

// function inverter(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let c = i; c < arr.length; c++) {
//             let x = arr[i];
//             arr[i] = arr[c];
//             arr[c] = x;
//         }
//     }
//     return arr;
// }
// console.log(inverter([1, 2, 3, 4, 5]))

///////////////////////////////////////////////////////////////////////////////////////////////////////

// indexOf() para vários
// function aparecer(arr, num) {
//     let nums = []
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] === num) {
//             nums.push(i)
//         }
//     }
//     return nums
// }

// console.log(aparecer([1, 4, 3, 1, 5, 1], 1))

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ver se número repete

// function repete(arr, num) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let c = i + 1; c < arr.length; c++) {
//             if (arr[i] === arr[c] && arr[c] === num) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }

// console.log(repete([1, 2, 3, 1, 3, 5, 2, 4], 1))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ver se é par ou ímpar

// const numeros = [0,1,2,3,4,5];
// numeros.forEach(element => console.log(`${element} é`, !(element%2)? "par": "ímpar"))

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Dobrar valores

// const array = [1, 2, 3, 4];
// const arrayDouble = array.map(element => element*3)
// console.log(arrayDouble)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Colocar em letras maiúsculas

// const array = ['oi', 'tudo', 'bem?'];
// const ARRAY = array.map(element => element.toUpperCase());
// console.log(ARRAY);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Verificar nota

// const alunos = [
//     { nome: 'Diogo', media: 5.5 },
//     { nome: 'Julia', media: 9.5 },
//     { nome: 'Roberto', media: 1.5 },
//     { nome: 'Tiago', media: 6.0 }
// ];
// const aprovados = alunos.filter(element => element.media >= 6)
// console.table(aprovados)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Calcular área

// const dimensoes = [
//     { altura: 10, comprimento: 20},
//     { altura: 2, comprimento: 4},
//     { altura: 1, comprimento: 1},
//     { altura: 50, comprimento: 50}
// ]
// const area = dimensoes.reduce( (prevValue, element) => prevValue + (element.altura * element.comprimento), 0 );
// console.log(area)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Verificar se tem mais de 16

// const pessoas = [
//     { nome: "Bruno", idade: 15 },
//     { nome: "Amanda", idade: 17 },
//     { nome: "Felipe", idade: 15 },
//     { nome: "Leonardo", idade: 16 }
// ]
// const mais16 = pessoas.filter( element => element.idade >= 16 )
// console.log(mais16)