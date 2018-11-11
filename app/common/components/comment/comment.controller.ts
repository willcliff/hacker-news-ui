
import { HackerRankService } from '../../services/hackerrank.service';

export class CommentsController implements ng.IController {

    public $inject = ['HackerRankService'];

    constructor(public hackerRankService: HackerRankService) {
    }

    public $onInit() {
        // Display child comments
    }


}
