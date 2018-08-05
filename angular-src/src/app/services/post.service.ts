import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: Http) { }

  post(post) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts/new', post, { headers: headers })
                    .pipe(map(res => res.json()));
  }

  retrievePosts() {
    let headers = new Headers();
    return this.http.get('http://localhost:3000/posts/', { headers: headers })
                    .pipe(map(res => res.json()));
  }
}
