import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QumlLibraryComponent } from './quml-library.component';
import { McqComponent } from './mcq/mcq.component';
import { LayoutstripComponent } from './layoutstrip/layoutstrip.component';
import { SaComponent } from './sa/sa.component';
import { PlayerComponent } from './player/player.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { EndpageComponent } from './endpage/endpage.component';

@NgModule({
  declarations: [QumlLibraryComponent, McqComponent,
     LayoutstripComponent, SaComponent, PlayerComponent, EndpageComponent],
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports: [QumlLibraryComponent, McqComponent, LayoutstripComponent, SaComponent, PlayerComponent]
})
export class QumlLibraryModule { }
