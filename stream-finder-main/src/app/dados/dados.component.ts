import { Component, HostListener, OnInit } from '@angular/core';
import { TmdbAPIService } from '../services/tmdb-api.service';
import { ActivatedRoute } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { IonicSlides } from '@ionic/angular';
register();

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss'],
})

export class DadosComponent implements OnInit {

  public accountID: string = '';
  public sessionID: string = '';

  public account_state: any;

  swiperModules = [IonicSlides];
  stream: any;
  details: any;
  credits: any;
  duracao: any;
  data: any;
  orcamento: any;
  receita: any;
  video: any;
  recomendacao: any;
  
  qtdTemporadas: any;
  status: any;
  tipo: any;

  screenWidth: any;

  constructor(private tmdbAPI: TmdbAPIService, private route: ActivatedRoute) {
    this.screenWidth = this.swiperWidth();
  }

  swiperWidth(){
    const tamanho = window.innerWidth;
    console.log('Width da tela:', window.innerWidth);

    if(tamanho < 576) return 3.2;
    else if(tamanho < 768) return 4.2;
    else if(tamanho < 992) return 5.2;
    else return 6.2;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Atualize o tamanho da tela quando ocorrer um evento de redimensionamento
    this.screenWidth = this.swiperWidth();
  }

  ngOnInit() {
    this.dadosInfo();
  }

  ionViewWillLeave(){
    this.credits = [];
    this.recomendacao = [];
  }

  formatarHoras(duracao: number) {
    const horas = Math.floor(duracao / 60);
    const minutos = duracao % 60;
    const horasStr = ('0' + horas).slice(-2);
    const minutosStr = ('0' + minutos).slice(-2);
    return `${horasStr}h ${minutosStr}m`;
  }

  formatarValor(valor: number) {
    const partes = valor.toFixed(2).split('.');
    return (valor > 0) ? "US$ " + partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + partes[1] : "Valor não informado";
  }

  //Adicionar e remover da watchlist
  addWatchList(media_id: any, watchlistStatus: boolean) {
    // Atualize o estado local imediatamente
    const previousState = this.account_state.watchlist;
    this.account_state.watchlist = watchlistStatus;

    
    this.tmdbAPI.postWatchlist(this.accountID, this.sessionID, this.tipo, media_id, watchlistStatus).subscribe(res => {
      console.log(res);
    },
    err => {
      console.error(err);
      // Reverter a mudança se houve um erro na requisição
      this.account_state.watchlist = previousState;
    });
  }

  addFavorite(media_id: any, favoriteStatus: boolean) {
    // Atualize o estado local imediatamente
    const previousState = this.account_state.favorite;
    this.account_state.favorite = favoriteStatus;


    this.tmdbAPI.postFavorite(this.accountID, this.sessionID, this.tipo, media_id, favoriteStatus).subscribe(res => {
      console.log(res);
    },
    err => {
      console.error(err);
      // Reverter a mudança se houve um erro na requisição
      this.account_state.favorite = previousState;
    });
  }





  async dadosInfo() {
    this.route.params.subscribe(params => {

      this.sessionID = localStorage.getItem('sessionID') || ''; // Usando operador lógico OR para fornecer um valor padrão vazio se não houver sessionID armazenado
      console.log('SessionID dentro do dados:', this.sessionID);
      this.accountID = localStorage.getItem('accountID') || ''; // Usando operador lógico OR para fornecer um valor padrão vazio se não houver sessionID armazenado
      console.log('accountID dentro do dados:', this.accountID);

      const routeConfig = this.route.routeConfig;
    
      this.tipo = (routeConfig?.path?.startsWith('filme'))? "movie" : "tv";

      const id = params['id'];
      //recomendacao
      this.tmdbAPI.getRecomendacao(id, this.tipo).subscribe(res => {
        this.recomendacao = res.results;
        console.log("recomendacao: ");
        console.log(res);
      })

      if(this.sessionID){
        this.tmdbAPI.getAccountState(id, this.sessionID, this.tipo).subscribe(res => {
          this.account_state = res;
          console.log(this.account_state);
        })
      }


      //nome dos atores
      this.tmdbAPI.getCredits(id, this.tipo).subscribe(res => {
        this.credits = res;
        console.log("credits: ");
        console.log(res);
      })

      //dados dos filmes
      this.tmdbAPI.getDetails(id, this.tipo).subscribe(res => {
        this.details = res;
        console.log("Details: ");
        console.log(res);

        if(this.tipo == "movie"){
          this.data = this.details?.release_date.replace(/-/g, '/');
          this.duracao = this.formatarHoras(this.details?.runtime);
          this.orcamento = this.formatarValor(this.details?.budget);
          this.receita = this.formatarValor(this.details?.revenue);
        }
        else{
          this.data = this.details?.first_air_date.replace(/-/g, '/');
          this.qtdTemporadas = this.details?.seasons.length;
          this.qtdTemporadas += (this.qtdTemporadas == 1)? " temporada" : " temporadas"; 
          if(this.details?.status == "Canceled"){
            this.status = "cancelada";
          }
          else if(this.details?.status == "Ended"){
            this.status = "finalizada";
          }
          else if(this.details?.status == "Returning Series"){
            this.status = "em produção";
          };
        }
      })

      //trailer do filme
      this.tmdbAPI.getVideo(id, this.tipo).subscribe(res => {

        if (res.results[0] != undefined) {
          console.log("true");
          this.video = res?.results[0].key;
        }

      });


      // onde assistir
      this.tmdbAPI.getProviders(id, this.tipo).subscribe(res => {
        this.stream = res.results;
        console.log("STREAM");
        console.log(res.results);
      });
    })
  }
}
