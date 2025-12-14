import { Component, signal, inject, effect, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser, DOCUMENT, AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Navigation } from './navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, AsyncPipe, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _document = inject(DOCUMENT);
  private readonly breakpointObserver = inject(BreakpointObserver);

  protected readonly title = signal('r-fu-dot-com');
  protected readonly isDarkMode = signal(false);
  protected readonly menuOpen = signal(false);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
      this._updateTheme(prefersDark);
    }

    effect(() => {
      this._updateTheme(this.isDarkMode());
    });
  }

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
  }

  toggleMenu() {
    this.menuOpen.update(open => !open);
  }

  private _updateTheme(isDark: boolean) {
    if (isDark) {
      this._document.body.classList.add('dark');
    } else {
      this._document.body.classList.remove('dark');
    }
  }
}
