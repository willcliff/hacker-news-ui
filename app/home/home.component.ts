import { HomeController } from './home.controller';
import './home.component.scss';

export class HomeComponent implements ng.IComponentOptions {
    public static NAME = 'homeView';
    public controller: any;
    public controllerAs: string;
    public templateUrl: any;

    constructor() {
        this.controller = HomeController;
        this.controllerAs = 'ctrl';
        this.templateUrl = require('./home.component.html');
    }
}
