import { NavBarComponent } from './nav-bar.component';
import { app } from '../app';

describe('HomeController', () => {

    let ctrl: any;
    let $componentController: angular.IComponentControllerService;

    beforeEach(() => {
        angular.mock.module('ui.router');
        angular.mock.module(app.name);
    });

    beforeEach(inject(
        (
            _$componentController_: ng.IComponentControllerService
        ) => {
            $componentController = _$componentController_;
            ctrl = $componentController(NavBarComponent.NAME, {});
        }));

    describe('constructor', () => {

        it('should create an instance of NavBarController', () => {
            expect(ctrl).toBeDefined();
        });

    });

});
