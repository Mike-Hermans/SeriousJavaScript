var app = angular.module('story', ['ngRoute']);

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
            .otherwise({
                redirectTo: '/stories'
            });
}]);