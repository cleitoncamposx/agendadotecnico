import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Section } from '../models/section';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private urlAuth: string = `${environment.url_base}api/oauth2/v1/token`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  private section = new BehaviorSubject<Section>(new Section());

  public setSection(section: Section): void {
    this.section.next(section);
  }

  public getSection(): Observable<Section> {
    return this.section.asObservable();
  }

  createSection(username: string, password: string): Observable<Section> {

    const url: string =
      `${this.urlAuth}?grant_type=password&username=${username}&password=${password}`;

    return this.http.post<Section>(url, null).pipe(
      tap({
        next: async (section) => {
          try {
            console.log('seção', section);

            this.setSection(section);

            await this.storageService.set<Section>(
              environment.STOTAGE_KEY_SECTION,
              section
            );

          } catch (e) {
            console.log('erro de gravação', e);
          }
        },
        error: (err) => {
          console.log('erro:', err);
        },
        finalize: () => {}
      })
    );
  }
}