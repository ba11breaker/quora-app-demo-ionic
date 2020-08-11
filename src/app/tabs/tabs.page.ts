import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabHome = 'tab1';
  tabDiscovery = 'tab2';
  tabChat = 'tab3';

  constructor() {}

}
