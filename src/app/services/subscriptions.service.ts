import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubscriptionsData} from '../model/subscriptions-data.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(private http: HttpClient) {
  }

  getSubscriptionsData(userId: number, authorizedUserId: number) {
    return this.http.get<SubscriptionsData>('api/subscriptions/user/' + userId + '/authorizeduser/' + authorizedUserId);
  }

  subscribe(userId: number, authorizedUserId: number) {
    return this.http.get<SubscriptionsData>('api/subscriptions/subscribing/user/' + userId + '/authorizeduser/' + authorizedUserId);
  }

  unsubscribe(userId: number, authorizedUserId: number) {
    return this.http.delete<SubscriptionsData>('api/subscriptions/unsubscribing/user/' + userId + '/authorizeduser/' + authorizedUserId);

  }
}
