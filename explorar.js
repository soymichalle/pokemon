const prompt = require('prompt-sync')();

async function buscarPokemon(nombre) {

    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

    if (!respuesta.ok) {
        console.log("Estado del request: ", respuesta.status);
        console.log("Error. Valide.");

    } else {
        const datos = await respuesta.json();

        console.log("====== TIPOS ======");

        for (let t of datos.types) {
            console.log(t.type.name);

        }

        console.log("====== STATS ======");
        for (let s of datos.stats) {
            console.log("Nombre: " + s.stat.name + " - Base_stat: ", s.base_stat);
        }

        console.log("====== HABILIDADES ======");
        for (let a of datos.abilities) {
            console.log(a.ability.name);
        }
    }
}

async function mostrarFicha(datos) {
    if (!datos) {
        console.log("Error: No se encontraron los datos");
        return
    }

    console.log("Nombre:", datos.name.toUpperCase());
    console.log("Número:", datos.id);

}
buscarPokemon("pikachu");
