import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TasksManagerComponent } from './pages/tasks-manager/tasks-manager.component';
import { TasksManagerAuthorizationComponent } from './pages/tasks-manager/tasks-manager-authorization/tasks-manager-authorization.component';
import { TasksManagerHomeComponent } from './pages/tasks-manager/tasks-manager-home/tasks-manager-home.component';
import { TasksManagerMyTasksComponent } from './pages/tasks-manager/tasks-manager-home/tasks-manager-my-tasks/tasks-manager-my-tasks.component';
import { TasksManagerSharedTasksComponent } from './pages/tasks-manager/tasks-manager-home/tasks-manager-shared-tasks/tasks-manager-shared-tasks.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'tasks', component: TasksManagerComponent, children: [
      { path: '', redirectTo: 'authorization', pathMatch: 'full' },
      { path: 'authorization', component: TasksManagerAuthorizationComponent },
      {
        path: 'home', component: TasksManagerHomeComponent, children: [
          { path: '', redirectTo: 'my-tasks', pathMatch: 'full' },
          { path: 'my-tasks', component: TasksManagerMyTasksComponent },
          { path: 'shared-tasks', component: TasksManagerSharedTasksComponent },
        ]
      },
    ]
  },

  { path: '**', redirectTo: '/home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
