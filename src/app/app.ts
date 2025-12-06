import { Component, AfterViewInit, signal, inject, effect, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser, DOCUMENT, AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

declare const GitHubCalendar: any;
declare const tippy: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _document = inject(DOCUMENT);
  private readonly breakpointObserver = inject(BreakpointObserver);

  protected readonly title = signal('r-fu-dot-com');
  protected readonly isDarkMode = signal(false);

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

  private _updateTheme(isDark: boolean) {
    if (isDark) {
      this._document.body.classList.add('dark');
    } else {
      this._document.body.classList.remove('dark');
    }
  }

  ngAfterViewInit() {
    GitHubCalendar(".calendar", "RuideFu", {
      responsive: true,
      tooltips: false // DISABLE the broken library tooltips
    }).then(function () {
      // MANUAL FIX: Use the correct class '.js-calendar-graph-table' to find the days
      const dayElements = document.querySelectorAll('.js-calendar-graph-table .ContributionCalendar-day');

      // REMOVE NATIVE TITLES to prevent double tooltips
      const xpaths = [
        "/html/body/div/section[2]/div[2]/div[2]/div[1]/a",
        "/html/body/div/section[2]/div[2]/div[2]/div[1]/div/div/div[1]/table/caption"];
      // remove xpath element if it exists
      xpaths.forEach(xpath => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as Element;
        if (element) {
          element.remove();
        }
      });

      // Attach Tippy.js tooltips manually to these elements
      tippy(dayElements, {
        content(reference: any) {
          // Retrieve data directly from the element attributes
          const count = reference.getAttribute('data-level'); // GitHub uses data-level for color, but we might want the text
          // Note: The raw text (e.g., "No contributions on Jan 1") is usually in the <span class="sr-only"> or tool-tip attribute
          // Let's try to grab the title or constructing it if missing
          const date = reference.getAttribute('data-date');
          const formattedMonthDay = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

          // GitHub's new format often puts the text in a child or title attribute
          // We will use the native title if available, or fallback to a generic message
          const titleText = reference.getAttribute('title') || `Contributions on ${formattedMonthDay}: ${count}`;
          return titleText;
        },
        theme: 'custom', // We define this theme in CSS below
        placement: 'top',
        allowHTML: true,
      });
    });
  }
}
