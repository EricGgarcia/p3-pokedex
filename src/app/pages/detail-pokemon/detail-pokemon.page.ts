import { Component} from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: false,
})
export class DetailPokemonPage{

  public pokemon: pokemon;

  constructor(
    private navParams:NavParams,
    private navcontroller: NavController) {
      this.pokemon= this.navParams.data["pokemon"];
      //console.log(this.pokemon);

    }

  goBack(){
    this.navcontroller.pop();
  }

}
