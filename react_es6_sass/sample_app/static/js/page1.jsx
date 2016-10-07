import * as shared from "./shared.jsx";
import {AuthorList} from "./author.jsx";

console.log("page1 loading...");

//**********************************************************************
function main() {
    console.log("page1 loaded");
    ReactDOM.render(<AuthorList/>, document.getElementById('authors'));
    $("#content1").text("Dynamically changed in one.");
    shared.make_change();
}

//**********************************************************************
$(document).ready(function() {
    main();
});
