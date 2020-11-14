import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit {

  constructor() {
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  @Input()
  photoURIs: string[];

  ngOnInit(): void {
  }

}
