
import { HackerRankService } from '../../services/hackerrank.service';

export class CommentsController implements ng.IController {

    public $inject = ['HackerRankService'];

    constructor(public hackerRankService: HackerRankService) {
    }

    public $onInit() {
        console.log('WILL COMMENT ARRAY = ', this.hackerRankService.getComments());
    }


}
