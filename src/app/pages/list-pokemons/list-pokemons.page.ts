import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { pokemon } from 'src/app/models/pokemon';
import { LoadingController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: false,
})
export class ListPokemonsPage implements OnInit {

  public pokemons: pokemon[];

  constructor(
    private pokemonService:PokemonService,
    private loadingController: LoadingController,
    private navParams:NavParams,
    private navcontroller: NavController) {
    this.pokemons= [];
  }

  ngOnInit() {
    this.morePokemon();
  }

  async morePokemon($event= null){
    const promise= this.pokemonService.getPokemons();

    if(promise){

      let loading= null;
      if(!$event){
        loading= await this.loadingController.create({
          message: 'Cargando...'
        });
         await loading.present();
      }

      promise.then( (result: pokemon[]) =>{
        //console.log(result);
        this.pokemons= this.pokemons.concat(result);
        //console.log(this.pokemons);

        if($event){
          $event.target.complete();
        }

        if(loading){
          loading.dismiss();
        }
      })

      .catch( (err)=>{
        if($event){
          $event.target.complete();
        }
        if(loading){
          loading.dismiss();
        }
      });
    }
  }

  goToDetail(pokemon: pokemon){
    this.navParams.data["pokemon"]= pokemon;
    this.navcontroller.navigateForward("detail-pokemon");
  }

}
