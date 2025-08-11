import { Component, OnInit } from '@angular/core';
import { TmdbAPIService } from '../services/tmdb-api.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  public accountID: string = '';
  public sessionID: string = '';
  public movies: any[] = [];
  public tv: any[] = [];
  public account_state: any;
  constructor(private tmdbAPI: TmdbAPIService) {}

  ngOnInit() {
    this.getSessionIDFromLocalStorage();
    this.getAccountIdFromLocalStorage();

  }

  ionViewWillEnter() {
    this.showMovieWatchList();
    this.showTvWatchlist();
  }

  getSessionIDFromLocalStorage() {
    this.sessionID = localStorage.getItem('sessionID') || ''; // Usando operador lógico OR para fornecer um valor padrão vazio se não houver sessionID armazenado
    console.log('SessionID dentro da lista:', this.sessionID);
  }
  getAccountIdFromLocalStorage() {
    this.accountID = localStorage.getItem('accountID') || ''; // Usando operador lógico OR para fornecer um valor padrão vazio se não houver sessionID armazenado
    console.log('accountID dentro da lista:', this.accountID);
  }

  //FEITO SOMENTE PRA PEGAR A WATCHLISTA DO INDIVIDUO
  showMovieWatchList() {
    if (this.accountID.length > 0 && this.sessionID.length > 0) {
      this.tmdbAPI.getWatchlist(this.accountID, this.sessionID, 'movies' ).subscribe(res => {
        this.movies = [...res.results];
        console.log("Filmes na lista:");
        console.log(this.movies);
      })
    } else {
      console.log("Lista: Usuario não logado");
    }
  }

  showTvWatchlist() {
    if (this.accountID.length > 0 && this.sessionID.length > 0) {
      this.tmdbAPI.getWatchlist(this.accountID, this.sessionID, 'tv' ).subscribe(res => {
        this.tv = [...res.results];
        console.log("Series na lista:");
        console.log(this.tv);
      })
    } else {
      console.log("Lista: Usuario não logado");
    }
  }



  showAccountState(){
    this.tmdbAPI.getAccountState(this.movies , this.sessionID).subscribe(res => {
      this.account_state = res;
      console.log(this.account_state);
    })
  }


  addWatchList(tipo: any ,media_id: any, watchlistStatus: boolean) {
    // Atualize o estado local imediatamente

    this.tmdbAPI.postWatchlist(this.accountID, this.sessionID, tipo, media_id, watchlistStatus).subscribe(res => {
      console.log(res);
      location.reload();
      // A requisição foi bem-sucedida, nenhuma ação adicional necessária.
    },
    err => {
      console.error(err);
      // Reverter a mudança se houve um erro na requisição
    });
  }


}
