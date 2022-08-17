import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpClient) {
    this.fetchPokemons().subscribe((response: any) =>
      response.results.forEach((pokemon: any) => {
        this.http.get(pokemon.url).subscribe((pokemon: any) => {
          this.pokemons.push(pokemon);
          this.pokemons.sort((a: any, b: any) => a.id - b.id);
        });
      })
    );
  }

  public pokemons: any = [];

  fetchPokemons() {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
  }
  getPokemon(pokemonName: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  }
  getPokemonSpecies(pokemonName: string) {
    return this.http.get(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
    );
  }
  getPokemonChain(url: string) {
    return this.http.get(url);
  }
}
