import { Component, AfterViewInit, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, DOCUMENT, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';

declare const GitHubCalendar: any;
declare const tippy: any;

interface SkillCategory {
  name: string;
  items: string[];
}
interface SkillsData {
  categories: SkillCategory[];
}

interface ExperienceItem {
  title: string;
  role: string;
  date: string;
  url?: string;
  github?: string;
  description: string;
  tags?: string[];
}
interface ExperienceData {
  items: ExperienceItem[];
}

interface EducationOutreachItem {
  title: string;
  date: string;
  description: string;
  url?: string;
}
interface EducationOutreachData {
  items: EducationOutreachItem[];
}

interface HomeData {
  skills?: SkillsData;
  experience?: ExperienceData;
  education_outreach?: EducationOutreachData;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit, OnInit {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _document = inject(DOCUMENT);
  private http = inject(HttpClient);

  homeData$ = this.http.get<HomeData>('assets/home-data.json').pipe(shareReplay(1));

  skills$ = this.homeData$.pipe(
    map(data => data.skills?.categories || [])
  );

  experience$ = this.homeData$.pipe(
    map(data => data.experience?.items || [])
  );

  educationOutreach$ = this.homeData$.pipe(
    map(data => data.education_outreach?.items || [])
  );

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this._platformId)) {
      GitHubCalendar(".calendar", "RuideFu", {
        responsive: true,
        tooltips: false // DISABLE the broken library tooltips
      }).then(() => {
        // MANUAL FIX: Use the correct class '.js-calendar-graph-table' to find the days
        const dayElements = document.querySelectorAll('.js-calendar-graph-table .ContributionCalendar-day');

        // REMOVE NATIVE TITLES to prevent double tooltips
        const xpaths = [
          "/html/body/app-root/div/app-home/section[2]/div[2]/div[2]/div[1]/a",
          "/html/body/app-root/div/app-home/section[2]/div[2]/div[2]/div[1]/div/div/div[1]/table/caption"];
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
}
