/**
 * Created by mike on 21/06/15.
 */
app.controller('ReadStoryCtrl',
    function ($scope,
              $http,
              $routeParams,
              Story_base,
              Story_details,
              Story_option) {
        this.fragmentId = $routeParams.fragmentId;
        $scope.story = null;
        $http.get("http://tools.mikehermans.nl/story_api/get.php?id=" + this.fragmentId).success(function (data) {
            var options = [];
            // If story part has options, add them to object
            if(data.options) {
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
                new Story_base (
                    data.id,
                    data.title
                ),
                data.text,
                options
            );
        });
    });