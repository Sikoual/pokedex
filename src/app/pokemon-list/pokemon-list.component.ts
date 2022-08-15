import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../shared/services/pokemons.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  constructor(
    private pokemonService: PokemonsService,
    private http: HttpClient
  ) {}

  public pokemons: any = [];

  ngOnInit(): void {
    this.pokemonService.fetchPokemons().subscribe((response: any) =>
      response.results.forEach((pokemon: any) => {
        this.http.get(pokemon.url).subscribe((pokemon: any) => {
          this.pokemons.push(pokemon);
        });
      })
    );
    // this.pokemonService.fetchPokemons().subscribe((response: any) => {
    //   response.results.forEach((result: any) =>
    //     this.pokemonService
    //       .fetchPokemonData(result.name)
    //       .subscribe((pokemon: any) => {
    //         this.pokemons.push(pokemon);
    //         console.log(this.pokemons);
    //       })
    //   );
    // });
  }
}
