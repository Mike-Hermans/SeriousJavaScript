/**
 * Created by mike on 21/06/15.
 */
app.controller('EditStoryCtrl', function ($scope,
                                          $http,
                                          $routeParams,
                                          $location,
                                          Story_base,
                                          Story_details,
                                          Story_option) {
    var fragmentId = $routeParams.fragmentId;
    $scope.story = null;

    /*
        loadData() is a function, so everytime a new option is added,
        new data will be loaded instantly and no refresh is needed.
     */
    $scope.loadData = function() {
        $http.get("http://tools.mikehermans.nl/story_api/get.php?id=" + fragmentId).success(function (data) {
            var options = [];
            // If story part has options, add them to object
            if (data.options) {
                $.each(data.options, function (key, value) {
                    options.push(new Story_option(
                            value.id,
                            value.text,
                            value.linkto
                        )
                    );
                });
            }

            // Add other data to object
            $scope.story = new Story_details(
                new Story_base(
                    data.id,
                    data.title
                ),
                data.text,
                options
            );
        });
    };
    // Load data for first time calling controller
    $scope.loadData();

    /*
        STORY
     */
    // Edit Title
    $scope.editTitle = function (story) {
        var request = $http({
            method: "POST",
            url: "http://tools.mikehermans.nl/story_api/edittitle.php",
            data: {
                fragment_id: $routeParams.fragmentId,
                story_title: story.title
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        request.success(function(data) {
            switch(data) {
                case "1":
                    Materialize.toast("Editted title can not be empty", 3000);
                    break;
                default:
                    Materialize.toast("Title has been changed.", 3000);
            }
        });

        request.error(function() {
            Materialize.toast("Could not edit title at this moment.", 3000);
        });
    };

    /*
        FRAGMENTS
     */
    // Edit text from current story fragment
    $scope.editText = function (story) {
        var request = $http({
            method: "POST",
            url: "http://tools.mikehermans.nl/story_api/editstory.php",
            data: {
                fragment_id: $routeParams.fragmentId,
                story_text: story.text
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        request.success(function(data) {
            switch(data) {
                case "1":
                    Materialize.toast("Edited text can not be empty", 3000);
                    break;
                default:
                    Materialize.toast("Story text has been changed.", 3000);
            }
        });

        request.error(function() {
            Materialize.toast("Could not edit text at this moment.", 3000);
        });
    };

    // Add new option to current story fragment
    $scope.addOption = function (option) {
        // Check if option is defined
        if (!option) {
            Materialize.toast("You have to fill in all values", 3000);
        } else {
            var request = $http({
                method: "POST",
                url: "http://tools.mikehermans.nl/story_api/postoption.php",
                data: {
                    fragmentId: $routeParams.fragmentId,
                    title: option.title,
                    content: option.content
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            request.success(function(data) {
                switch(data) {
                    case "1":
                        Materialize.toast("You have to fill in all values", 3000);
                        break;
                    default:
                        Materialize.toast(option.title + " has been added", 3000);

                        // Clear option inputs
                        option.title = "";
                        option.content = "";
                }
                $scope.loadData();
                $('.collapsible').collapsible({
                    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                });
            });

            request.error(function() {
                Materialize.toast("Not able to add option at this moment.", 3000);
            });
        }
    };

    // Remove story
    $scope.removeStory = function () {
        $http.get("http://tools.mikehermans.nl/story_api/removestory.php?id=" + fragmentId).success(function () {
            Materialize.toast("Story has been deleted", 3000);
            $location.path('/stories');
        }).error(function() {
            Materialize.toast("Can not remove story at this time", 3000);
        });
    };

    /*
        OPTIONS
     */
    // Remove option
    $scope.removeOption = function(option) {
        console.log(option);
        $http.get("http://tools.mikehermans.nl/story_api/removeoption.php?id=" + option.id).success(function (data) {
            Materialize.toast("Option has been deleted", 3000);
            $scope.loadData();
            console.log(data);
        }).error(function() {
            Materialize.toast("Can not remove option at this time", 3000);
        });
    };

    // Edit option
    $scope.editOption = function(option) {
        var request = $http({
            method: "POST",
            url: "http://tools.mikehermans.nl/story_api/editoption.php",
            data: {
                option_id: option.id,
                option_text: option.text
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        request.success(function(data) {
            switch(data) {
                case "1":
                    Materialize.toast("Edited option can not be empty", 3000);
                    break;
                default:
                    Materialize.toast("Option has been changed.", 3000);
            }
        });

        request.error(function() {
            Materialize.toast("Could not edit text at this moment.", 3000);
        });
    }
});