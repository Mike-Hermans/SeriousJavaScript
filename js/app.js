var app = angular.module('story', ['ngRoute', 'ui.materialize']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/stories', {
                templateUrl: 'views/stories.html',
                controller: 'StoriesCtrl'
            })
            .when('/create', {
                templateUrl: 'views/createStory.html',
                controller: 'CreateStoryCtrl'
            })
            .when('/read/:fragmentId', {
                templateUrl: 'views/readStory.html',
                controller: 'ReadStoryCtrl as story'
            })
            .when('/edit/:fragmentId', {
                templateUrl: 'views/editStory.html',
                controller: 'EditStoryCtrl as story'
            })
            .otherwise({
                redirectTo: '/stories'
            });
}]);