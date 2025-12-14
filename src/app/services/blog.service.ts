import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface BlogPost {
  title: string;
  date: string;
  url: string;
  slug: string;
  summary?: string;
  subtitle?: string;
  content?: string;
}

export interface BlogListResponse {
  data: BlogPost[];
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly dataUrl = '/assets/blog-data.json';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogListResponse>(this.dataUrl).pipe(
      map(response => response.data)
    );
  }

  getPost(slug: string): Observable<BlogPost> {
    return this.getPosts().pipe(
      map(posts => {
        const post = posts.find(p => p.slug === slug);
        if (!post) {
          throw new Error(`Post not found: ${slug}`);
        }
        return post;
      })
    );
  }
}
