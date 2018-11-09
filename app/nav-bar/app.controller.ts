export class AppController implements ng.IController {
    public $inject = ['$state'];

    constructor(public $state: ng.ui.IStateService) {
        // $state.go('app.home');
    }
}

