import { CommentComponent } from '../comment/comment.component';
import { app } from '../../../app';
import { HackerRankService } from '../../services/hackerrank.service';

describe('CommentController', () => {

    let ctrl: any;
    let $componentController: angular.IComponentControllerService;

    beforeEach(() => {
        angular.mock.module('ui.router');
        angular.mock.module(app.name);
    });

    beforeEach(inject(
        (
            _$componentController_: ng.IComponentControllerService,
            _hackerRankService_: HackerRankService
        ) => {
            $componentController = _$componentController_;
            ctrl = $componentController(CommentComponent.NAME,
                {
                    hackerRankService: _hackerRankService_
                });
            ctrl.$onInit();
        }));

    describe('$onInit', () => {

        it('should create an instance of CommentController', () => {
            expect(ctrl).toBeDefined();
        });

    });

});
