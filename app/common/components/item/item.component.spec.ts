import { ItemComponent } from '../item/item.component';
import { app } from '../../../app';
import { Constants } from '../../constants';
import { HackerRankService } from '../../services/hackerrank.service';

describe('HomeController', () => {

    let ctrl: any;
    let $componentController: angular.IComponentControllerService;
    let $rootScope: ng.IScope;
    let $document: ng.IDocumentService;

    beforeEach(() => {
        angular.mock.module('ui.router');
        angular.mock.module(app.name);
    });

    beforeEach(inject(
        (
            _$componentController_: ng.IComponentControllerService,
            _$rootScope_: ng.IScope,
            _$document_: ng.IDocumentService,
            _hackerRankService_: HackerRankService
        ) => {
            $componentController = _$componentController_;
            $rootScope = _$rootScope_;
            $document = _$document_;
            ctrl = $componentController(ItemComponent.NAME,
                {
                    $document: $document,
                    hackerRankService: _hackerRankService_
                });
                ctrl.$onInit();
        }));

    describe('$onInit', () => {

        it('should create an instance of ItemController', () => {
            expect(ctrl).toBeDefined();
        });

        it('should reset and close the comments when the the close comments event is broadcast and the comments are open', () => {
            spyOn(ctrl, 'resetComments');
            ctrl.$onInit();
            ctrl.isCollapsed = false;
            $rootScope.$broadcast(Constants.CLOSE_OPEN_COMMENTS);
            expect(ctrl.resetComments).toHaveBeenCalled();
        });

        it('should not reset and close the comments when the the close comments event is broadcast and the comments are not pen', () => {
            spyOn(ctrl, 'resetComments');
            ctrl.$onInit();
            ctrl.isCollapsed = true;
            $rootScope.$broadcast(Constants.CLOSE_OPEN_COMMENTS);
            expect(ctrl.resetComments).not.toHaveBeenCalled();
        });

    });

    describe('$onDestroy()', () => {

        it('should unregister the event listeners', () => {
            spyOn(ctrl, 'unregisterCloseModalEventHandler');
            ctrl.$onDestroy();
            expect(ctrl.unregisterCloseModalEventHandler).toHaveBeenCalled();
        });

    });

    describe('toggleComments', () => {

        it('should reset and close the comments when the the close comments event is broadcast and the comments are open', () => {
            spyOn(ctrl.hackerRankService, 'clearComments');
            ctrl.isCollapsed = false;
            ctrl.resetComments();
            expect(ctrl.hackerRankService.clearComments).toHaveBeenCalled();
            expect(ctrl.isCollapsed).toEqual(true);
          });

    });

    describe('resetComments', () => {

        it('should reset and close the comments when the the close comments event is broadcast and the comments are open', () => {
            spyOn(ctrl.hackerRankService, 'clearComments');
            ctrl.isCollapsed = false;
            ctrl.resetComments();
            expect(ctrl.hackerRankService.clearComments).toHaveBeenCalled();
            expect(ctrl.isCollapsed).toEqual(true);
          });

    });
});
