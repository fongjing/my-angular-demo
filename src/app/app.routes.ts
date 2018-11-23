import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }, {
        path: 'todo',
        component: TodoComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);