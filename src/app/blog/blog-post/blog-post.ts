import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService, BlogPost } from '../../services/blog.service';
import { Observable, switchMap } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.scss',
  encapsulation: ViewEncapsulation.None
})
export class BlogPostComponent implements OnInit {
  post$: Observable<BlogPost> | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug')!;
        return this.blogService.getPost(slug);
      })
    );
  }

  sanitize(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
