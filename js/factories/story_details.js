/**
 * Created by mike on 01/07/15.
 */
app.factory('Story_details', function() {
    function Story_details(Story_base, text, options) {
        this.id = Story_base.id;
        this.title = Story_base.title;
        this.text = text;
        this.options = options;

        this.optionsAvailable = function() {
            return this.options.length;
        }
    }

    return Story_details;
});