import { CommentsController } from './comment.controller';
import './comment.component.scss';

export class CommentComponent implements ng.IComponentOptions {
    public static NAME = 'hackerComment';
    public controller: any;
    public controllerAs: string;
    public templateUrl: any;
    public bindings: any;

    constructor() {
        this.controller = CommentsController;
        this.controllerAs = 'ctrl';
        this.templateUrl = require('./comment.component.html');
        this.bindings = {
            comment: '=',
            commentNum: '='
          };
    }
}
