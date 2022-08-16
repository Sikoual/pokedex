import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpClient) {}

  public pokemons: any;

  fetchPokemons() {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
  }
}
