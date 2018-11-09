import { HomeComponent } from './home.component';
import { HackerRankService } from '../common/services/hackerrank.service';
import { Constants } from '../common/constants';
// import { dummyTopStoriesResponse } from '../common/mock-objects';

describe('HomeController', () => {

    let ctrl: any;
    let $componentController: angular.IComponentControllerService;
    let $state: ng.ui.IStateService;

    beforeEach(() => {
        angular.mock.module('ui.router');
        angular.mock.module('ui.bootstrap');
        angular.mock.module('ui.bootstrap.tpls');
        angular.mock.module(Constants.APP_MODULE_NAME, [
            'ui.router',
            'ui.bootstrap',
            'ui.bootstrap.tpls'
        ]);

    });

    beforeEach(inject(
        (
            _$componentController_: angular.IComponentControllerService,
            _hackerRankService_: HackerRankService) => {
            $componentController = _$componentController_;
            ctrl = $componentController(HomeComponent.NAME,
                {
                    hackerRankService: _hackerRankService_
                });
            spyOn($state, 'go');
            ctrl.$onInit();
        }));


    describe('constructor', () => {
        it('should create an instance of HomeController', () => {
            expect(ctrl).toBeDefined();
        });
    });
});
