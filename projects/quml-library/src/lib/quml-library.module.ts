import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QumlLibraryComponent } from './quml-library.component';
import { McqComponent } from './mcq/mcq.component';
import { LayoutstripComponent } from './layoutstrip/layoutstrip.component';
import { SaComponent } from './sa/sa.component';
import { VsaComponent } from './vsa/vsa.component';
import { LaComponent } from './la/la.component';
import { QumlComponent } from './quml/quml.component';

@NgModule({
  declarations: [QumlLibraryComponent, McqComponent,
     LayoutstripComponent, SaComponent, SaComponent, VsaComponent, LaComponent, QumlComponent],
  imports: [
    BrowserModule
  ],
  exports: [QumlLibraryComponent, McqComponent, LayoutstripComponent, SaComponent, VsaComponent, LaComponent , QumlComponent]
})
export class QumlLibraryModule { }
