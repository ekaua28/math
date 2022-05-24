import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  private static URL = "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new";

  private randomNumber$: BehaviorSubject<number>;

  constructor(private http: HttpClient) {
    this.randomNumber$ = new BehaviorSubject<number>(null);
  }

  fetchNumber() {
    this.http.get(RandomService.URL).subscribe(value => this.randomNumber$.next((value as number)))
  }

  getRandomNumber$(){
    return this.randomNumber$.asObservable();
  }
}
