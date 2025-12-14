---
title: "Building a Modern Portfolio: Angular + Node.js"
date: 2024-12-14T15:00:00-05:00
draft: false
summary: "A deep dive into the architecture of this website, featuring Angular 19, a custom Node.js content pipeline, and Docker."
---

Welcome to my new portfolio site! This project represents a modern approach to static site generation, combining the component-based architecture of **Angular** with a lightweight **Node.js** content pipeline.

## The Architecture

The core philosophy behind this project is **simplicity and control**. Instead of relying on heavy static site generators, we use a custom script to process content.

### 1. Angular Frontend
The user interface is built with **Angular**, utilizing the latest features like **Signals** and **Standalone Components**. 

- **Navigation**: Client-side routing with the Angular Router ensures instant page transitions.
- **Material Design**: Angular Material provides a robust, accessible component library.
- **Data Fetching**: The `BlogService` uses Angular's `HttpClient` to fetch content dynamically.

### 2. Node.js Content Pipeline
We replaced the traditional CMS with a simple **Node.js script**.

- **Content**: All blog posts are written in standard **Markdown** in the `content/posts` directory.
- **Processing**: A custom script (`scripts/generate-content.js`) parses these files using:
  - `gray-matter`: To extract frontmatter metadata (title, date, summary).
  - `marked`: To convert Markdown body text into HTML.
- **Output**: The script generates a single `src/assets/blog-data.json` file containing all posts.

### 3. The Data Flow
1. **Write**: Content is authored in Markdown.
2. **Build**: 
   - `npm start` or `npm run build` triggers the content generation script.
   - The script compiles Markdown -> JSON.
3. **Serve**: The Angular dev server serves the app and the `assets/blog-data.json` file.
4. **Consume**: The Angular app loads the JSON file to display the blog list and individual articles.

## Deployment
The entire environment is containerized using **Docker**.

- A custom `Dockerfile` installs Node.js and Angular CLI.
- It ensures consistency across development and deployment environments (no more "it works on my machine"!).

## Why this stack?
This setup offers the best of both worlds:

- **Developer Experience**: I use standard tools (Node.js, Angular) without needing to learn a specific SSG's template language.
- **Control**: The content generation logic is just 50 lines of JavaScript, fully customizable.
- **Performance**: The entire blog database is a tiny JSON file, loaded instantly.

Feel free to explore the code on [GitHub](https://github.com/RuideFu/ruidefu.github.io)!
