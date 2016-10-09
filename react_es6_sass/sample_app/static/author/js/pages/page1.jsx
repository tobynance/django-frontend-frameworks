import * as shared from "../shared.jsx";
import {AuthorStore} from '../models.js';
import {AddNewAuthor, AuthorList} from "../components.jsx";

console.log("page1 loading...");

var FIXTURE = [
  {firstName: 'Susan', lastName: 'Jones', description: 'has a beard'},
  {firstName: 'Jerry', lastName: 'Jones', description: 'super tall'},
  {firstName: 'Tina', lastName: 'Turner', description: 'probably dead'},
];

// AuthorStore.reset(FIXTURE);
function success(collection, response, options) {
    console.log("success");
    console.log(collection);
    console.log(response);
    console.log(options);
}
function error(collection, response, options) {
    console.log("error");
    console.log(collection);
    console.log(response);
    console.log(options);
}
AuthorStore.fetch({success: success, error: error});

//**********************************************************************
function main() {
    console.log("page1 loaded");
    // Just showing that you can have multiple top-level react components
    ReactDOM.render(<AddNewAuthor/>, document.getElementById('add-new-author'));
    ReactDOM.render(<AuthorList authors={AuthorStore}/>, document.getElementById('authors'));
}

//**********************************************************************
$(document).ready(function() {
    main();
});
