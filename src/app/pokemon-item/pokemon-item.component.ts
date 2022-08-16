import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../shared/services/pokemons.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent implements OnInit {
  constructor(
    private pokemonService: PokemonsService,
    private activatedRoute: ActivatedRoute
  ) {}

  public pokemons: any = this.pokemonService.pokemons;
  public pokemonName: string | null;
  public currentPokemon: any = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.pokemonName = paramMap.get('name');
    });
    if (this.pokemonName) {
      this.pokemonService
        .getPokemon(this.pokemonName)
        .subscribe((pokemon: any) => {
          this.currentPokemon.push(pokemon);
        });
    }
    console.log(this.currentPokemon);
  }
}
