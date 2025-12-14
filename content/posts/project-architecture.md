---
title: "Building a Modern Portfolio: Angular + Headless Hugo"
date: 2024-12-14T15:00:00-05:00
draft: false
summary: "A deep dive into the architecture of this website, featuring Angular 19, Headless Hugo, and a custom JSON API."
---

Welcome to my new portfolio site! This project represents a modern approach to static site generation, combining the component-based architecture of **Angular** with the blazing-fast content management of **Hugo**.

## The Architecture

The core philosophy behind this project is **separation of concerns**. The frontend content delivery is decoupled from content management, allowing each text stack to do what it does best.

### 1. Angular Frontend
The user interface is built with **Angular**, utilizing the latest features like **Signals** and **Standalone Components**. 
- **Navigation**: Client-side routing with the Angular Router ensures instant page transitions.
- **Material Design**: Angular Material provides a robust, accessible component library.
- **Data Fetching**: The `BlogService` uses Angular's `HttpClient` to fetch content dynamically.

### 2. Headless Hugo
Instead of using Hugo to render full HTML pages, we configure it as a **Headless CMS**.
- **Content**: All blog posts are written in Markdown.
- **Output**: Custom layouts in `layouts/_default/` allow Hugo to output **JSON** instead of HTML.
  - `index.json`: Returns a list of all posts with metadata.
  - `single.json`: Returns the full content of an individual post.
  
This allows us to treat the filesystem as a database.

### 3. The Data Flow
1. **Write**: Content is authored in Markdown.
2. **Build**: Hugo compiles the content into JSON files in the `public/` directory.
3. **Serve**: The Angular dev server (or a production web server) serves these static JSON files.
4. **Consume**: The Angular app requests `index.json` to build the blog list and `posts/{slug}/index.json` to render the article.

## Deployment
The entire environment is containerized using **Docker**.
- A custom `Dockerfile` installs Node.js, Angular CLI, and Hugo Extended.
- This ensures consistency across development and deployment environments (no more "it works on my machine"!).

## Why this stack?
This setup offers the best of both worlds:
- **Developer Experience**: I can use Angular's powerful tooling for UI development.
- **Content Management**: writing in Markdown is simple, portable, and version-controllable.
- **Performance**: The final result is a static site that can be hosted anywhere (GitHub Pages, Netlify, S3) with zero backend maintenance.

Feel free to explore the code on [GitHub](https://github.com/RuideFu/temp-personal)!
