
import { HackerRankService } from '../services/hackerrank.service';

export class ItemController implements ng.IController {
    public welcome = 'hello ng';
    public animationsEnabled = true;
    public isCollapsed = true;


    public $inject = ['$document', 'HackerRankService'];

    constructor(public $document: ng.IDocumentService, public hackerRankService: HackerRankService) {
        console.log('WILL TEST!!!!');
        this.welcome = 'Hello! WEB TEST';
    }

}
