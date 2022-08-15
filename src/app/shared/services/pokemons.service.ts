import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemons } from '../interfaces/pokemons';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpClient) {}

  public pokemons: any;

  fetchPokemons() {
    return this.http
      .get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .subscribe((pokemons: any) =>
        pokemons.results.forEach((pokemon: any) =>
          this.fetchPokemonData(pokemon)
        )
      );
  }
  fetchPokemonData(pokemon: any) {
    let url = pokemon.url;
    this.http.get(url).subscribe((pokemonData: any) => {
      this.pokemons = pokemonData;
      return this.pokemons;
    });
  }
}