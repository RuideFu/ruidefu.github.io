import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService, BlogPost } from '../../services/blog.service';
import { Observable, switchMap, tap } from 'rxjs';
import { DomSanitizer, SafeHtml, Title, Meta } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug')!;
        return this.blogService.getPost(slug);
      }),
      tap(post => {
        if (post) {
          this.titleService.setTitle(`${post.title} | by R. Fu`);

          // Update Meta Tags for SEO and Social Previews
          this.meta.updateTag({ name: 'description', content: post.summary || '' });

          // Open Graph (Facebook, LinkedIn, iMessage, etc.)
          this.meta.updateTag({ property: 'og:title', content: post.title });
          this.meta.updateTag({ property: 'og:description', content: post.summary || '' });
          this.meta.updateTag({ property: 'og:type', content: 'article' });
          this.meta.updateTag({ property: 'og:url', content: window.location.href });

          if (post.image) {
            // Convert relative markdown path (e.g. "../assets/...") to absolute URL
            const cleanPath = post.image.replace(/^\.\.\//, '/');
            const fullUrl = new URL(cleanPath, window.location.origin).href;

            this.meta.updateTag({ property: 'og:image', content: fullUrl });
            this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          } else {
            this.meta.removeTag('property="og:image"');
            this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
          }
        }
      })
    );
  }

  sanitize(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
