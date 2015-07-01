/**
 * Created by mike on 22/06/15.
 */
app.factory('Story_base', function() {
    function Story_base(id, title) {
        this.id = id;
        this.title = title;
    }

    return Story_base;
});