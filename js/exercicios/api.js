async function getPeople() {
    const response = await fetch( "https://randomuser.me/api/?results=10" );
    return response.json();
};

getPeople().then( data => {
    const pessoas = data.results;
    const mulheres = pessoas.filter( element => element.gender === "female" )
    mulheres.map(element => console.log(element.name.first + " " + element.name.last))
} )

getPeople().then( data => {
    const dados = data.results.filter( element => element.dob.age >= 30 );
    const pessoas = dados.map(element => {
        return {
            "Nome": `${element.name.first} ${element.name.last}`,
            "Sexo": element.gender,
            "Idade": element.dob.age
        }
    })
    console.table(pessoas)
} )