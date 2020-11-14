import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Report} from '../model/report.model';
import {Observable, ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  private $count: Subject<any> = new ReplaySubject(1);

  get count(): Observable<any> {
    return this.$count.asObservable();
  }

  setCount() {
    this.$count.next();
  }

  sendReport(postId: number, report: string) {
    return this.http.post('/api/reports/post/' + postId, report);
  }

  getAllReports(page: number, count: number) {
    return this.http.get<Report[]>('/api/reports/page/' + page + '/count/' + count);
  }

  getCountAllReports() {
    return this.http.get<number>('/api/reports/count');
  }

  markAsChecked(id: number) {
    return this.http.get('/api/reports/checking/' + id);
  }

  markAsUnchecked(id: number) {
    return this.http.get('/api/reports/unchecking/' + id);
  }

  getCountUnreadReports() {
    return this.http.get<number>('/api/reports/unread/count');
  }
}
