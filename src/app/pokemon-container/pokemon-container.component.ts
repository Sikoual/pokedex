import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../shared/services/pokemons.service';

@Component({
  selector: 'app-pokemon-container',
  templateUrl: './pokemon-container.component.html',
  styleUrls: ['./pokemon-container.component.scss'],
})
export class PokemonContainerComponent implements OnInit {
  constructor(private pokemonService: PokemonsService) {}

  ngOnInit() {}
}
