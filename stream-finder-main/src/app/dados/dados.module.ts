import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DadosComponent } from './dados.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [DadosComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DadosModule { }
