import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface apiResult{
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}


@Injectable({
  providedIn: 'root'
})
export class TmdbAPIService {

  private bearer: string = environment.tmdbBearer;
  private key: string = environment.tmdbKey;

  constructor(private http: HttpClient) { }

  getSearchMoviesAndTv(name: string, page: number): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/search/multi?query=${name}&include_adult=false&language=pt-BR&api_key=${this.key}&page=${page}`
    );
  }

  getProviders(id: string, tipo: string): Observable<any> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/${tipo}/${id}/watch/providers`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.bearer}`
        })
      }
    );
  }

  getDetails(id: string, tipo: string): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/${tipo}/${id}?language=pt-br`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.bearer}`
        })
      }
    );
  }

  getCredits(id: string, tipo: string): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/${tipo}/${id}/credits?language=pt-br`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.bearer}`
        })
      }
    );
  }

  getVideo(id: string, tipo: string): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/${tipo}/${id}/videos?language=pt-br`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.bearer}`
        })
      }
    );
  }

  getRecomendacao(id: string, tipo: string): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/${tipo}/${id}/recommendations?language=en-US&page=1`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.bearer}`
        })
      }
    );
  }

  getPopularMovies(page: number): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/movie/popular?language=pt-BR&api_key=${this.key}&page=${page}`
    );
  }


  getPopularTV(page: number): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/tv/popular?api_key=${this.key}&page=${page}`
    );
  }

  getDiscoverMovies(page: number): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/discover/movie?language=pt-BR&api_key=${this.key}&page=${page}`
    );
  }

  getDiscoverTV(page: number): Observable<apiResult> {
    return this.http.get<apiResult>(
      `https://api.themoviedb.org/3/discover/tv?language=pt-BR&api_key=${this.key}&page=${page}`
    );
  }


  getPagesData(): Observable<any> {
    const page1$ = this.getDiscoverMovies(1);
    const page2$ = this.getDiscoverMovies(2);
    const page3$ = this.getDiscoverMovies(3);

    return forkJoin<any>([page1$, page2$, page3$]).pipe(
      map(results => {
        // Aqui você pode manipular os resultados, se necessário
        return results;
      })
    );
  }
    //Relacionado ao login: Pede um token
    getRequestToken(): Observable<any> {
      return this.http.get<any>(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.key}`);
    }

    //valida o token e chama a sessão aq
    validateRequestToken(username: string, password: string, request_token: string): Observable<any> {
      return this.http.post<any>(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${this.key}`,
      {username, password, request_token});
    }
    //chama a sessão
    getSessionID(requestToken: string): Observable<any> {
      return this.http.get<any>(`https://api.themoviedb.org/3/authentication/session/new?api_key=${this.key}&request_token=${requestToken}`);
    }

    //pega a informação da conta(importante pegar a sessão)
    getAccountInfo(sessionToken: String): Observable<any> {
      return this.http.get<any>(`https://api.themoviedb.org/3/account?api_key=${this.key}&session_id=${sessionToken}`);
    }
    //Pegar se um filme está na watchlist
    getAccountState(id?: any, sessionToken?: String, tipo?: string): Observable<any> {
      return this.http.get<any>(`https://api.themoviedb.org/3/${tipo}/${id}/account_states?api_key=${this.key}&session_id=${sessionToken}  `);
    }

    postWatchlist(accountId: string, sessionId: string, media_type: string, media_id: string, watchlist: boolean): Observable<apiResult> {
      return this.http.post<apiResult>(
        `https://api.themoviedb.org/3/account/${accountId}/watchlist?session_id=${sessionId}`,
        {media_type, media_id, watchlist},
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${this.bearer}`})
        }
      )
    }

    //Criei um Favorite, pois eu acho mais intuitivo :thinking:
    postFavorite(accountId: string, sessionId: string, media_type: string, media_id: string, favorite: boolean): Observable<apiResult> {
      return this.http.post<apiResult>(
        `https://api.themoviedb.org/3/account/${accountId}/favorite?session_id=${sessionId}`,
        {media_type, media_id, favorite},
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${this.bearer}`})
        }
      )
    }


    getWatchlist(accountId: string, sessionId: string, media_type: string): Observable<apiResult> {
      return this.http.get<apiResult>(
        `https://api.themoviedb.org/3/account/${accountId}/watchlist/${media_type}?api_key=${this.key}&language=pt-BR&page=1&sort_by=created_at.asc&session_id=${sessionId}`,
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${this.bearer}`})
        }
      );
  }
}
