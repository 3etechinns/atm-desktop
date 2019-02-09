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

@NgModule({
  declarations: [
    ContentHeaderComponent,
    DialogComponent,
    InfoboxComponent,
    ProgressComponent,
    TitlebarComponent,
    SidebarComponent,
    SmallBoxComponent,
    SwitchComponent
  ],
  exports: [
    ContentHeaderComponent,
    DialogComponent,
    InfoboxComponent,
    ProgressComponent,
    TitlebarComponent,
    SidebarComponent,
    SmallBoxComponent,
    SwitchComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class WidgetsModule {}
