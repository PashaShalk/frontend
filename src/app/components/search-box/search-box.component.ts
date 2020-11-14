import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  constructor() {
  }

  hashtag = '';

  ngOnInit(): void {
  }

  search(event) {
    this.hashtag = event.target.value;
  }

}
