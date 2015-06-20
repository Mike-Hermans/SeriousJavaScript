/**
 * Created by mike on 20/06/15.
 */
app.controller('CreateStoryCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.create = function(story) {
        var request = $http({
            method: "POST",
            url: "http://tools.mikehermans.nl/story_api/post_story.php",
            data: {
                title: story.title,
                description: story.description,
                firstcontent: story.firstcontent
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        request.success(function(data) {
            Materialize.toast(story.title + " has been created", 3000);
        });

        request.error(function(data) {
            Materialize.toast("Not able to create story at this moment.", 3000);
        });
    };
}]);