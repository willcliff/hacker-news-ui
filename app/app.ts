import { module, element, bootstrap } from 'angular';
import 'bootstrap';
import 'angular-ui-bootstrap';
import { HomeComponent } from '../app/home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ItemComponent } from './common/components/item/item.component';
import { CommentComponent } from './common/components/comment/comment.component';
// import { WelcomeComponent } from './welcome/welcome.component';
import { HackerRankService } from './common/services/hackerrank.service';
declare global {
    const angular: ng.IAngularStatic;
}

import './app.scss';
import { Constants } from './common/constants';

export let app: ng.IModule = module(Constants.APP_MODULE_NAME, [
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.tpls'

])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state({
            component: NavBarComponent.NAME,
            name: 'app',
            url: '/app'
        }).state(
            {
                component: HomeComponent.NAME,
                name: 'app.home',
                url: '/home'
            })
        .state(
            {
                data: {
                    scss: ['./welcome/welcome.component.scss']
                },
                name: 'app.welcome',
                templateUrl: require('./welcome/welcome.component.html'),
                url: '/welcome'
            });

        $urlRouterProvider.otherwise('/app/home');
    }])
    .component(NavBarComponent.NAME, new NavBarComponent())
    .component(HomeComponent.NAME, new HomeComponent())
    .component(ItemComponent.NAME, new ItemComponent())
    .component(CommentComponent.NAME, new CommentComponent())
    .service(HackerRankService.NAME, HackerRankService);

element(document).ready(() => {
    bootstrap(document, [Constants.APP_MODULE_NAME]);
});
