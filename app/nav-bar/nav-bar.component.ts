import { NavBarController } from './nav-bar.controller';
import './nav-bar.component.scss';

export class NavBarComponent implements ng.IComponentOptions {
    public static NAME = 'appView';
    public controller: any;
    public templateUrl: any;

    constructor() {
        this.controller = NavBarController;
        this.templateUrl = require('./nav-bar.component.html');
    }
}
