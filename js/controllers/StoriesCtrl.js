app.controller('StoriesCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get("http://tools.mikehermans.nl/story_api/get.php").success(function(data) {
     $scope.data = data;
  });
}]);
