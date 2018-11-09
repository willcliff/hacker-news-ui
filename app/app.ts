import { module, element, bootstrap } from 'angular';
import 'bootstrap';
import 'angular-ui-bootstrap';
import { AppComponent } from '../app/nav-bar/app.component';
import { HomeComponent } from '../app/home/home.component';
import { ItemComponent } from '../app/common/components/item.component';
import { HackerRankService } from '../app/common/services/hackerrank.service';
declare global {
    const angular: ng.IAngularStatic;
  }

import './app.scss';
import { Constants } from './common/constants';

export let app = module(Constants.APP_MODULE_NAME, [
    'ui.router'
])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state({
            component: AppComponent.NAME,
            name: 'app',
            url: '/app'
        }).state(
            {
                component: HomeComponent.NAME,
                name: 'app.home',
                url: '/home'
            });

        $urlRouterProvider.otherwise('/app/home');
    }])
    .component(AppComponent.NAME, new AppComponent())
    .component(HomeComponent.NAME, new HomeComponent())
    .component(ItemComponent.NAME, new ItemComponent())
    .service(HackerRankService.NAME, HackerRankService);

element(document).ready(() => {
    bootstrap(document, [Constants.APP_MODULE_NAME]);
});
