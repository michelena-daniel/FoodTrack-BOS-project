import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Post } from '../../mainPage.models';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  getWall(userId?: string): Observable<Post[]> {
    const path = userId ? `/${userId}` : '';

    return this.http.get<Post[]>(`${environment.apiBaseUrl}/getPosts${path}`);
  }

  addPost(foodName: string, description: string, calories: number,  userId?: string): Observable<Post> {
    const path = userId ? `/${userId}` : '';

    return this.http.post<Post>(`${environment.apiBaseUrl}/post${path}`, {
      foodName,
      description,
      calories

    });
  }
}
