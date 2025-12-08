import { Routes } from '@angular/router';
import { Home } from './components/pages-area/home/home';
import { List } from './components/data-area/list/list';
import { Add } from './components/data-area/add/add';
import { GetRandomLoc } from './components/data-area/get-random-loc/get-random-loc';
import { Page404 } from './components/pages-area/page404/page404';

export const routes: Routes = [
    { path: "", component: Home, title: "GeoStaff - Location-Based Workforce Management" },
    { path: "home", component: Home, title: "GeoStaff - Home" },
    { path: "list", component: List, title: "GeoStaff - Employee List" },
    { path: "add", component: Add, title: "GeoStaff - Add Employee" },
    { path: "random-loc", component: GetRandomLoc, title: "GeoStaff - Random Employee Location" },
    { path: "**", component: Page404, title: "GeoStaff - Page Not Found" },
];
