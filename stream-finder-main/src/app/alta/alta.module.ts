import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaComponent } from './alta.component';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [AltaComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterLink
  ]
})
export class AltaModule { }
