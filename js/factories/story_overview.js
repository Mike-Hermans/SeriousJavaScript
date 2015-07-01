/**
 * Created by mike on 01/07/15.
 */
app.factory('Story_overview', function() {
    function Story_overview(Story_base, description, first_fragment) {
        this.id = Story_base.id;
        this.title = Story_base.title;
        this.description = description;
        this.first_fragment = first_fragment;
    }

    return Story_overview;
});