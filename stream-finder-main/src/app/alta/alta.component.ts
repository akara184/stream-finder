import { Component, OnInit, } from '@angular/core';
import { TmdbAPIService } from '../services/tmdb-api.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';


@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],

})

export class AltaComponent implements OnInit {
  movies: any[] = []; //Armazena o resultado do getPopularMovie
  tv: any[] = [];

  currentPage = 1; //Passível de paginação


  constructor(private tmdbAPI: TmdbAPIService) {
  }

  //loop
  getRange(start: number, end: number) {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
  }

  //Ao iniciar eu carrego o loadMovies async
  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    this.tmdbAPI.getPopularMovies(this.currentPage).subscribe(res => {
      this.movies = [...res.results];
      this.loadTV();
      event?.target.complete();
    });
  }


  async loadTV() {
    this.tmdbAPI.getPopularTV(this.currentPage).subscribe(res => {
      this.tv = [...res.results];
      console.log(this.tv);
    });
  }




  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }

}
