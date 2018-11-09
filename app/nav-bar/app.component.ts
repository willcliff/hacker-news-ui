import { AppController } from './app.controller';
import './nav-bar.scss';

export class AppComponent implements ng.IComponentOptions {
    public static NAME = 'appView';
    public controller: any;
    public templateUrl: any;
    constructor() {
        this.controller = AppController;
        this.templateUrl = require('./app.component.html');
    }
}
