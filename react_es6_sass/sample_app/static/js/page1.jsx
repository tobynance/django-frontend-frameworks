import * as shared from "./views/shared.jsx";
import {AuthorStore} from './models/author.js';
import {AddNewAuthor, AuthorList} from "./views/author.jsx";

console.log("page1 loading...");

var FIXTURE = [
  {firstName: 'Susan', lastName: 'Jones', description: 'has a beard'},
  {firstName: 'Jerry', lastName: 'Jones', description: 'super tall'},
  {firstName: 'Tina', lastName: 'Turner', description: 'probably dead'},
];

AuthorStore.reset(FIXTURE);

//**********************************************************************
function main() {
    console.log("page1 loaded");
    // Just showing that you can have multiple top-level react components
    ReactDOM.render(<AddNewAuthor/>, document.getElementById('add-new-author'));
    ReactDOM.render(<AuthorList authors={AuthorStore}/>, document.getElementById('authors'));
    $("#content1").text("Dynamically changed in one.");
    shared.make_change();
}

//**********************************************************************
$(document).ready(function() {
    main();
});
