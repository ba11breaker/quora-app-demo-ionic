import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabHome = 'home';
  tabDiscovery = 'discovery';
  tabChat = 'chat';
  tabNotification = 'notification'
  tabMore = 'more'

  constructor() {}

}
