import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { QumlLibraryComponent } from './quml-library.component';
import { McqComponent } from './mcq/mcq.component';
import { LayoutstripComponent } from './layoutstrip/layoutstrip.component';

@NgModule({
  declarations: [QumlLibraryComponent, McqComponent, LayoutstripComponent],
  imports: [
    BrowserModule
  ],
  exports: [QumlLibraryComponent,McqComponent,LayoutstripComponent]
})
export class QumlLibraryModule { }
