# r-fu-dot-com

Personal website project built with Angular.

## Overview

This repository contains the source code for `r-fu-dot-com`, a modern web application built using [Angular](https://angular.dev/).

## Features

- **Framework**: Angular 21
- **Styling**: SCSS/CSS
- **Development**: Dockerized environment for consistent dev experience

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) (recommended)
- [Node.js](https://nodejs.org/) (if running locally without Docker)

### Running with Docker (Recommended)

This project includes a `docker-shell.sh` script to spin up a consistent development environment.

1. **Start the Docker Shell**:
   ```bash
   ./docker-shell.sh
   ```
   This command will:
   - Check if the container is running (and start it via `docker-compose` if not).
   - Drop you into an interactive shell inside the container.

2. **Run the Application**:
   Inside the Docker shell:
   ```bash
   npm install  # Install dependencies (only needed first time)
   ng serve --host 0.0.0.0
   ```

3. **Access the App**:
   Open your browser and navigate to `http://localhost:4200`.

### Running Locally

If you prefer to run directly on your host machine:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   ng serve
   ```

3. Navigate to `http://localhost:4200`.

## Project Structure

- `src/`: Source code for the Angular application.
- `docker-shell.sh`: Script to enter the Docker development environment.
- `docker-compose.yml`: Docker services configuration.
- `Dockerfile`: Definition for the development container.

## Content Management

The content for the home page (skills, experience, education) and blog posts is managed via files in the `content/` directory:
- **Home Content**: `content/home/*.toml`
- **Blog Posts**: `content/posts/*.md`

The application requires a JSON generation step to convert these files into assets that the Angular app can consume (`src/assets/home-data.json` and `src/assets/blog-data.json`).

 **Changes to content files require re-running the generation script.**

The build and serve commands are configured to run this automatically:
```bash
npm start # runs generation script then ng serve
npm run build # runs generation script then ng build
```

To manually regenerate the content (e.g., if you edited a file while the server is running):
```bash
node scripts/generate-content.js
```

## Building

To build the project for production:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

- **Unit Tests**: `ng test`
- **End-to-End Tests**: `ng e2e`
