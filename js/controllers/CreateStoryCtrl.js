/**
 * Created by mike on 20/06/15.
 */
app.controller('CreateStoryCtrl', function($scope, $http, $location) {
    $scope.create = function(story) {
        // Check if story is defined
        if (!story) {
            Materialize.toast("Fields cannot be empty", 3000);
        } else {
            var request = $http({
                method: "POST",
                url: "http://tools.mikehermans.nl/story_api/poststory.php",
                data: {
                    title: story.title,
                    description: story.description,
                    first_fragment: story.first_fragment
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            request.success(function(data) {
                switch(data) {
                    case "1":
                        Materialize.toast("Fields cannot be empty", 3000);
                        break;
                    default:
                        Materialize.toast(story.title + " has been created", 3000);
                        $location.path('/stories');
                }
            });

            request.error(function() {
                Materialize.toast("Not able to create story at this moment.", 3000);
            });
        }
    };
});