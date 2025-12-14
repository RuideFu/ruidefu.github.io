import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService, BlogPost } from '../../services/blog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.css'
})
export class BlogListComponent implements OnInit {
  posts$: Observable<BlogPost[]> | undefined;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.posts$ = this.blogService.getPosts();
  }
}
