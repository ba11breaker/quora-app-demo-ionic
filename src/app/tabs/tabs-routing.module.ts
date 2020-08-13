import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../pages/chat/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'discovery',
        loadChildren: () => import('../pages/discovery/discovery.module').then(m => m.DiscoveryPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../pages/notification/notification.module').then( m => m.NotificationPageModule)
      },
      {
        path: 'more',
        loadChildren: () => import('../pages/more/more.module').then( m => m.MorePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
