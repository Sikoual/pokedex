import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../shared/services/pokemons.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap } from 'rxjs';

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

  public pokemonName: string | null;
  public pokemonId: string | null;

  public pokemon: any;
  public evolutionPokemons: any[] = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.pokemonName = paramMap.get('name');
      this.pokemonId = paramMap.get('id');

      this.initPokemon(this.pokemonName);
    });
  }

  initPokemon(pokemonName: string | null) {
    if (!pokemonName) return;

    this.pokemonService.getPokemon(pokemonName).subscribe((pokemon: any) => {
      this.pokemon = pokemon;
    });

    this.getPokemonChain(pokemonName)//.subscribe(); // obligé de subscribe, sinon l'obersable n'est pas lancée
  }

  getEvolutionChainPokemonNames(evolutionData: any): string[] {
    const evolutionChainPokemonNames: string[] = [];
    if (!evolutionData[0] || !evolutionData[0].evolves_to) return [];

    evolutionChainPokemonNames.push(evolutionData[0].species.name);

    // on est d'accord qu'il faudrait gérer le récursif. Si jmais un pokémon a plus de 2 évolutions.
    if (evolutionData[0].evolves_to.length === 0) {
      return evolutionChainPokemonNames;
    }

    evolutionChainPokemonNames.push(
      evolutionData[0].evolves_to[0].species.name
    );
    return evolutionChainPokemonNames;
  }

  getPokemonsFromPokemonNames(pokemonNames: string[]) {
    pokemonNames.forEach((pokemonName: string, index: number) => {
      this.pokemonService
        .getPokemon(pokemonName)
        .subscribe((pokemon: any) => (this.evolutionPokemons[index] = pokemon));
      // j'insère à l'index, car en fonction du temps d'appel, je pourrais me retrouver avec les évolutions pas dans le bon ordre
    });
  }

  getPokemonChainFromUrl(pokemonChainUrl: string) {
    return this.pokemonService.getPokemonChain(pokemonChainUrl).pipe(
      tap((pokemonChain: any) => {
        const evolutionData = pokemonChain.chain.evolves_to;
        const evolutionChainPokemonNames =
          this.getEvolutionChainPokemonNames(evolutionData);

        evolutionChainPokemonNames.unshift(pokemonChain.chain.species.name); // ajout de la première évolution en premier

        this.getPokemonsFromPokemonNames(evolutionChainPokemonNames);
      })
    );
  }

  getPokemonChain(pokemonName: string) {
    return this.pokemonService.getPokemonSpecies(pokemonName).pipe(
      tap((pokemonSpecies: any) => { console.log(pokemonSpecies); }), // exemple
      switchMap((pokemonSpecies: any) => {
        const pokemonChainUrl = pokemonSpecies.evolution_chain.url;
        return this.getPokemonChainFromUrl(pokemonChainUrl);
      })
    );
  }
}
