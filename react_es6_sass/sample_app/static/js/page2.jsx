import * as shared from "./shared.jsx";
import {AuthorList} from "./author.jsx";

console.log("page2 loading...");

//**********************************************************************
function main() {
    console.log("page2 loaded");
    ReactDOM.render(<AuthorList/>, document.getElementById('authors'));
    $("#content1").text("Dynamically changed in two.");
    shared.make_change();
}

//**********************************************************************
$(document).ready(function() {
    main();
});
