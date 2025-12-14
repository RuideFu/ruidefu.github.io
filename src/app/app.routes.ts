import { Routes } from '@angular/router';
import { BlogListComponent } from './blog/blog-list/blog-list';
import { BlogPostComponent } from './blog/blog-post/blog-post';
import { Home } from './home/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'blog', component: BlogListComponent },
    { path: 'blog/:slug', component: BlogPostComponent }
];
