import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../shared/services/pokemons.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  constructor(private pokemonService: PokemonsService) {}
  public pokemons: any;

  ngOnInit(): void {
    this.pokemonService.fetchPokemons();
  }
}
