import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QumlLibraryComponent } from './quml-library.component';
import { McqComponent } from './mcq/mcq.component';
import { SaComponent } from './sa/sa.component';
import { PlayerComponent } from './player/player.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { EndpageComponent } from './endpage/endpage.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [QumlLibraryComponent, McqComponent, HeaderComponent,
      SaComponent, PlayerComponent, EndpageComponent],
  imports: [
    CommonModule,
    CarouselModule,
    HttpClientModule
  ],
  exports: [QumlLibraryComponent, McqComponent, SaComponent, PlayerComponent, HeaderComponent]
})
export class QumlLibraryModule { }
