import { triangle } from 'ionicons/icons';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperDirective } from '../directives/swiper.directive';
import { SwiperOptions } from 'swiper/types';
import { SwiperContainer } from 'swiper/element';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { register } from 'swiper/element/bundle';
register();
export interface Card {
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SwiperDirective, IonIcon],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WalkthroughPage implements OnInit, AfterViewInit {
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;

  contents: Card[] = [
    {
      title: 'Computer',
      description: 'Description about computer...',
      url: 'assets/images/walkthrough-1.png',
    },
    {
      title: 'Building',
      description: 'Building description...',
      url: 'assets/images/walkthrough-2.png',
    },
  ];

  index = 0;

  // Swiper
  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    navigation: true,
  };

  swiperThumbsConfig: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  };

  ngAfterViewInit() {
    this.swiper.nativeElement.swiper.activeIndex = this.index;
  }

  slideChange(swiper: any) {
    this.index = swiper.detail[0].activeIndex;
  }
  constructor() {
    addIcons({ triangle });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }


  handleRefresh(event: any) {
    setTimeout(async () => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

}
