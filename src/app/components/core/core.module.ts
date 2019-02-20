import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlebarComponent } from './titlebar/titlebar.component';

@NgModule({
  declarations: [TitlebarComponent],
  imports: [CommonModule],
  exports: [TitlebarComponent]
})
export class CoreModule {}
