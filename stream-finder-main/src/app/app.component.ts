import { Component, OnInit } from '@angular/core';
import { TmdbAPIService } from './services/tmdb-api.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent implements OnInit {
  public sessionID: string = '';
  public accountID: string = '';

  //Sempre pegar informação da conta
  ngOnInit() {
    this.getAccountDetails();
    this.getAccountId();
  }
  constructor(private tmdbAPI: TmdbAPIService) {
    this.getSessionIDFromLocalStorage();
  }

  //pra pegar a informação do localStorage
  getSessionIDFromLocalStorage() {
    this.sessionID = localStorage.getItem('sessionID') || ''; // Usando operador lógico OR para fornecer um valor padrão vazio se não houver sessionID armazenado
    console.log('Session ID from local storage:', this.sessionID);
  }

  //pra pegar a informação da conta
  getAccountDetails() {

    if (this.sessionID.length > 0) {
      this.tmdbAPI.getAccountInfo(this.sessionID).subscribe(res => {
        console.log("account info:");
        console.log(res);
      })
    }else{
      console.log("Você não está logado")
    }
  }

  getAccountId(){
    if (this.sessionID.length > 0) {
      this.tmdbAPI.getAccountInfo(this.sessionID).subscribe(res => {
        this.accountID = res.id;
        console.log("account id:" + this.accountID);
        localStorage.setItem("accountID", this.accountID);
      })

    }
  }
  //logout Simples
  logout() {
    localStorage.removeItem('sessionID');
    localStorage.removeItem('accountID');
    window.location.reload();
  }
}
