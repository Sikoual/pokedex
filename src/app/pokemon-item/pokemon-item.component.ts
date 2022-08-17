import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../shared/services/pokemons.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
  public pokemonId: string | null;
  public pokemonChain: any;
  public evolutionChain: any = [];
  public displayEvolutionPokemon: any = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.pokemonName = paramMap.get('name');
      this.pokemonId = paramMap.get('id');
    });
    if (this.pokemonName) {
      this.pokemonService
        .getPokemon(this.pokemonName)
        .subscribe((pokemon: any) => {
          this.currentPokemon.push(pokemon);
        });
      this.pokemonService
        .getPokemonSpecies(this.pokemonName)
        .subscribe((pokemonSpecies: any) => {
          this.pokemonChain = pokemonSpecies.evolution_chain;
          this.pokemonService
            .getPokemonChain(this.pokemonChain.url)
            .subscribe((pokemonChain: any) => {
              if (pokemonChain.chain.species.name) {
                this.evolutionChain.push(pokemonChain.chain.species.name);
                let evolutionData = pokemonChain.chain.evolves_to;
                if (evolutionData[0].hasOwnProperty('evolves_to')) {
                  this.evolutionChain.push(evolutionData[0].species.name);
                  if (evolutionData[0].evolves_to.length !== 0) {
                    this.evolutionChain.push(
                      evolutionData[0].evolves_to[0].species.name
                    );
                  }
                }
                console.log(this.evolutionChain);
              }
              for (let evolution of this.evolutionChain) {
                this.pokemonService
                  .getPokemon(evolution)
                  .subscribe((pokemon: any) =>
                    this.displayEvolutionPokemon.push(
                      pokemon.sprites.front_default
                    )
                  );
              }
              console.log(this.displayEvolutionPokemon);
            });
        });
    }
  }
}
