import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListaComponent } from './lista.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [ListaComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterLink
  ]
})
export class ListaModule { }
