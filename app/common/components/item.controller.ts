
import { HackerRankService } from '../services/hackerrank.service';

export class ItemController implements ng.IController {

    public $inject = ['$document', 'HackerRankService'];

    public welcome = 'hello ng';
    public animationsEnabled = true;
    public isCollapsed = true;

    constructor(public $document: ng.IDocumentService, public hackerRankService: HackerRankService) {
    }

    public $onInit() {
        console.log('WILL TEST!!!!');
    }

}
