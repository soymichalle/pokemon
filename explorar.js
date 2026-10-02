const prompt = require('prompt-sync')();

async function buscarPokemon(pokemonNombre) {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNombre}`);
    if (!respuesta.ok) {
        console.log("Hubo un errror: ", respuesta.status);
        return null;
    }
    const pokemon = await respuesta.json();
    return pokemon;
}

function mostrarFicha(pokemon) {
    if (pokemon == null) {
        return null;
    }
    console.log("NOMBRE: ", pokemon.name.toUpperCase(), "# POKEDEX: ", pokemon.id);

    let tipos = [];

    for (let t of pokemon.types) {
        tipos.push(t.type.name);
    }

    console.log(tipos.join(" / "));

    console.log(`Altura en cm: ${pokemon.height * 10} | Peso en kg: ${pokemon.weight / 10}`);

    console.log("---- ESTADISTICAS ----");

    for (let s of pokemon.stats) {
        console.log(s.stat.name, s.base_stat);
    }

    console.log("---- HABILIDADES ----");

    for (let a of pokemon.abilities) {
        if (a.ability.is_hidden) {
            console.log(a.ability.name, "(oculta)");
        } else {
            console.log(a.ability.name);
        }
    }
}

function obtenerStat(pokemon, nombreStat) {
    for (let s of pokemon.stats) {
        if (s.stat.name == nombreStat) {
            return s.base_stat;
        }
    }
    console.log("No se encontró la stat, RECUERDA QUE LAS STATS SON:");
    for (let s of pokemon.stats) {
        console.log("Nombre Stat:", s.stat.name);
    }
    return null;
}

function compararPokemon(nombre1, nombre2, stat1, stat2) {
    if (stat1 > stat2) {
        console.log(nombre1, "es el ganador");
    } else if (stat1 < stat2) {
        console.log(nombre2, "es el ganador");
    } else {
        console.log("Es empate");
    }
}

async function pokemonMasFuerte(listaNombres, stat) {
    let statMayor = 0;
    let nombreMayor;
    let pokemon = [];
    let statObtenido;
    for (let nombrePokemon of listaNombres) {

        pokemon = await buscarPokemon(nombrePokemon);
        statObtenido = obtenerStat(pokemon, stat);

        if (statObtenido > statMayor) {
            statMayor = statObtenido;
            nombreMayor = pokemon.name;
        }
    }
    return {nombre: nombreMayor}
}

async function main() {
    let pokemonNombre1 = prompt("¿Cual es tu pokemon?");
    let pokemonNombre2 = prompt("¿Cual es tu pokemon?");
    let pokemon = await buscarPokemon(pokemonNombre1);
    let pokemon2 = await buscarPokemon(pokemonNombre2);
    let nombreStat = prompt("¿Cual es la stat que quieres utilizar? ");
    let nombreStat2 = prompt("¿Cual es la otra stat que quieres utilizar? ");
    mostrarFicha(pokemon);
    mostrarFicha(pokemon2);
    compararPokemon(pokemon.name, pokemon2.name, obtenerStat(pokemon, nombreStat), obtenerStat(pokemon2, nombreStat2));
    console.log("---- POKEMON MAS FUERTE ----");
    console.log("El ganador es: ", await pokemonMasFuerte(["pikachu", "charizard", "eevee"],"speed"));
    console.log("----------------------------");
    
    
}

main();