import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../shared/services/pokemons.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  constructor(private pokemonService: PokemonsService) {}

  public pokemons: any = this.pokemonService.pokemons;

  ngOnInit(): void {
    // this.pokemonService.fetchPokemons().subscribe((response: any) =>
    //   response.results.forEach((pokemon: any) => {
    //     this.http.get(pokemon.url).subscribe((pokemon: any) => {
    //       this.pokemons.push(pokemon);
    //       this.pokemons.sort((a: any, b: any) => a.id - b.id);
    //     });
    //   })
    // );
  }
}
