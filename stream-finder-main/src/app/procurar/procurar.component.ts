import { Component, OnInit } from '@angular/core';
import { TmdbAPIService } from '../services/tmdb-api.service';

@Component({
  selector: 'app-procurar',
  templateUrl: './procurar.component.html',
  styleUrls: ['./procurar.component.scss'],
})
export class ProcurarComponent  implements OnInit {
  public texto: string = "";
  public moviesAndTV: any = "";

  constructor(private tmdbAPI: TmdbAPIService) {}

  getMovie(){
    this.tmdbAPI.getSearchMoviesAndTv(this.texto, 1).subscribe(res => {
      this.moviesAndTV = res.results.filter(item => item.media_type !== "person");
    });
  }
  async ngOnInit() {}

}
