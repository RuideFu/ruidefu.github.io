import { Component, input, output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatListModule, MatDividerModule, CommonModule, RouterLink],
  template: `
    <div class="nav-overlay" [class.open]="isOpen()" (click)="close.emit()">
      <div class="nav-content" (click)="$event.stopPropagation()">
        <mat-nav-list>
          <a mat-list-item routerLink="/" (click)="close.emit()">Home</a>
          <a mat-list-item routerLink="/blog" (click)="close.emit()">Blog</a>
          <mat-divider></mat-divider>
          <a mat-list-item href="/#education" (click)="close.emit()">Education</a>
          <a mat-list-item href="/#skills" (click)="close.emit()">Skills</a>
          <a mat-list-item href="/#experience" (click)="close.emit()">Experience</a>
          <a mat-list-item href="/#publications" (click)="close.emit()">Publications</a>
        </mat-nav-list>
      </div>
    </div>
  `,
  styles: [`
    .nav-overlay {
      position: fixed;
      top: 64px; /* Height of toolbar */
      left: 0;
      width: 100%;
      height: 0; /* Initially hidden */
      background: rgba(0,0,0,0.5);
      overflow: hidden;
      z-index: 1000;
      transition: opacity 0.3s;
      opacity: 0;
      pointer-events: none;
    }
    .nav-overlay.open {
      height: calc(100vh - 64px);
      opacity: 1;
      pointer-events: auto;
    }
    .nav-content {
      background: var(--mat-sys-surface);
      transform: translateY(-100%);
      transition: transform 0.3s ease-out;
      border-bottom: 1px solid var(--mat-sys-outline-variant);
      width: fit-content;
      min-width: 250px;
      border-right: 1px solid var(--mat-sys-outline-variant);
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      border-bottom-right-radius: 8px;
    }
    .nav-overlay.open .nav-content {
      transform: translateY(0);
    }
    /* Mat list item overrides for our custom menu */
    mat-nav-list a {
      color: var(--mat-sys-on-surface);
    }
    /* Ensure dark mode support via CSS variables which are already set up in global styles */
  `]
})
export class Navigation {
  isOpen = input(false);
  close = output();
}
