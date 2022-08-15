import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpClient) {}

  public pokemons: any;

  // fetchPokemons() {
  //   return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=20');
  // }
  // fetchPokemonData(pokemonName: string) {
  //   return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  // }
  fetchPokemons() {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=20`);
  }
  fetchPokemonsData(pokemon: any) {
    let url = pokemon.url;
    return this.http.get(url);
  }
  // fetchPokemons() {
  //   this.http
  //     .get('https://pokeapi.co/api/v2/pokemon?limit=151')
  //     .subscribe((pokemons: any) =>
  //       pokemons.results.forEach((pokemon: any) =>
  //         this.fetchPokemonData(pokemon)
  //       )
  //     );
  // }
  // fetchPokemonData(pokemon: any): any {
  //   let url = pokemon.url;
  //   this.http.get(url).subscribe((pokemonData: any) => {
  //     this.pokemons = pokemonData;
  //     console.log(this.pokemons);
  //   });
  // }
}
