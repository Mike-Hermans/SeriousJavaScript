app.controller('StoriesCtrl',
    function(
        $scope,
        $http,
        Story_base,
        Story_overview
    ) {
    $scope.stories = [];
    $http.get("http://tools.mikehermans.nl/story_api/get.php").success(function(data) {
        $.each(data, function(key, values) {
            $scope.stories.push(new Story_overview (
                new Story_base(
                    values.id,
                    values.title
                ),
                values.description,
                values.first_fragment));
        });
    });
});
