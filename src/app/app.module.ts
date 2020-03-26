import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ParticlesModule } from 'angular-particle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { TasksManagerComponent } from './pages/tasks-manager/tasks-manager.component';
import { TasksManagerAuthorizationComponent } from './pages/tasks-manager/tasks-manager-authorization/tasks-manager-authorization.component';
import { TasksManagerHomeComponent } from './pages/tasks-manager/tasks-manager-home/tasks-manager-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { TasksManagerMyTasksComponent } from './pages/tasks-manager/tasks-manager-home/tasks-manager-my-tasks/tasks-manager-my-tasks.component';
import { TasksManagerSharedTasksComponent } from './pages/tasks-manager/tasks-manager-home/tasks-manager-shared-tasks/tasks-manager-shared-tasks.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './preloader-config';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksManagerComponent,
    TasksManagerAuthorizationComponent,
    TasksManagerHomeComponent,
    TasksManagerMyTasksComponent,
    TasksManagerSharedTasksComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ParticlesModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'TaskManager'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    MatTooltipModule, ModalModule.forRoot(), BsDatepickerModule.forRoot(),
    MatExpansionModule,
    SimpleNotificationsModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
