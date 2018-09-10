import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  showSpinner:boolean = true;
  lastId: number;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.lastId = this.lastId+1;
    this.heroService.addHero({id:this.lastId,name:name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => {
      this.lastId = heroes[heroes.length-1].id;
      this.heroes = heroes;
      this.showSpinner = false;
    });
  }

  delete(hero: Hero): void {
    if(hero.id === this.lastId){
      this.lastId = this.lastId-1;      
    }
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();    
  }
}
