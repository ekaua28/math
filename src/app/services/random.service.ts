import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

/**
 * Service for getting random value form random.org
 */
@Injectable({
  providedIn: 'root'
})
export class RandomService {

  /**
   * Url to generated random number in random.org, in case if need more specific or more dynamic logic, can be changed on function base or etc.
   */
  private static URL = "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new";

  private randomNumber$: BehaviorSubject<number>;

  constructor(private http: HttpClient) {
    this.randomNumber$ = new BehaviorSubject<number>(null);
  }

  fetchNumber() {
    this.http.get(RandomService.URL).subscribe(value => this.randomNumber$.next((value as number)))
  }

  getRandomNumber$() {
    return this.randomNumber$.asObservable();
  }
}
