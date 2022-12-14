import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonContainerComponent } from './pokemon-container/pokemon-container.component';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';

@NgModule({
  declarations: [AppComponent, PokemonListComponent, PokemonContainerComponent, PokemonItemComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [PokemonListComponent],
})
export class AppModule {}
