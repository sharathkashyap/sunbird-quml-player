import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QumlLibraryComponent } from './quml-library.component';
import { McqComponent } from './mcq/mcq.component';
import { LayoutstripComponent } from './layoutstrip/layoutstrip.component';
import { SaComponent } from './sa/sa.component';
import { VsaComponent } from './vsa/vsa.component';
import { LaComponent } from './la/la.component';
import { QumlPlayerComponent } from './quml-player/quml-player.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [QumlLibraryComponent, McqComponent,
     LayoutstripComponent, SaComponent, SaComponent, VsaComponent, LaComponent, QumlPlayerComponent],
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports: [QumlLibraryComponent, McqComponent, LayoutstripComponent, SaComponent, VsaComponent, LaComponent , QumlPlayerComponent]
})
export class QumlLibraryModule { }
