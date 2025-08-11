import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurarComponent } from './procurar.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [ProcurarComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class ProcurarModule { }
