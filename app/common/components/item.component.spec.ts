import { ItemComponent } from '../../common/components/item.component';
import { app } from '../../app';
import { HackerRankService } from '../services/hackerrank.service';

describe('HomeController', () => {

    let ctrl: any;
    let $componentController: angular.IComponentControllerService;
    let $document: ng.IDocumentService;

    beforeEach(() => {
        angular.mock.module('ui.router');
        angular.mock.module(app.name);
    });

    beforeEach(inject(
        (
            _$componentController_: ng.IComponentControllerService,
            _$document_: ng.IDocumentService,
            _hackerRankService_: HackerRankService
        ) => {
            $componentController = _$componentController_;
            $document = _$document_;
            ctrl = $componentController(ItemComponent.NAME,
                {
                    $document: $document,
                    hackerRankService: _hackerRankService_
                });
        }));

    describe('constructor', () => {

        it('should create an instance of ItemController', () => {
            expect(ctrl).toBeDefined();
            ctrl.$onInit();
        });

    });
});
