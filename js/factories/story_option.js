/**
 * Created by mike on 01/07/15.
 */
app.factory('Story_option', function() {
    function Story_option(id, text, linkto) {
        this.id = id;
        this.text = text;
        this.linkto = linkto;
    }

    return Story_option;
});