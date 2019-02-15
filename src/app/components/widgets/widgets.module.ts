import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentHeaderComponent } from './content-header/content-header.component';
import { DialogComponent } from './dialog/dialog.component';
import { InfoboxComponent } from './infobox/infobox.component';
import { ProgressComponent } from './progress/progress.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { RouterModule } from '@angular/router';
import { SmallBoxComponent } from './small-box/small-box.component';
import { SwitchComponent } from './switch/switch.component';
import { PaginaterComponent } from './paginater/paginater.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { DetailBoxComponent } from './detail-box/detail-box.component';

@NgModule({
  declarations: [
    ContentHeaderComponent,
    DialogComponent,
    InfoboxComponent,
    ProgressComponent,
    TitlebarComponent,
    SidebarComponent,
    SmallBoxComponent,
    SwitchComponent,
    PaginaterComponent,
    DetailBoxComponent
  ],
  exports: [
    ContentHeaderComponent,
    DialogComponent,
    InfoboxComponent,
    ProgressComponent,
    TitlebarComponent,
    SidebarComponent,
    SmallBoxComponent,
    SwitchComponent,
    PaginaterComponent,
    DetailBoxComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class WidgetsModule {}
