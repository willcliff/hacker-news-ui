import { ItemController } from './item.controller';
import './item.component.scss';

export class ItemComponent implements ng.IComponentOptions {
    public static NAME = 'hackerItem';
    public controller: any;
    public controllerAs: string;
    public templateUrl: any;
    public bindings: any;

    constructor() {
        this.controller = ItemController;
        this.controllerAs = 'ctrl';
        this.templateUrl = require('./item.component.html');
        this.bindings = {
            data: '=',
            itemNum: '='
          };
    }
}
