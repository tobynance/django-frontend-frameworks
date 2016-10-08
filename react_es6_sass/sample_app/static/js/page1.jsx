import * as shared from "./views/shared.jsx";
import {AddNewAuthor, AuthorList} from "./views/author.jsx";
import {AuthorCollection} from './models/author.js';

console.log("page1 loading...");

var FIXTURE = [
  {firstName: 'Susan', lastName: 'Jones', description: 'has a beard'},
  {firstName: 'Jerry', lastName: 'Jones', description: 'super tall'},
  {firstName: 'Tina', lastName: 'Turner', description: 'probably dead'},
];

var authors = new AuthorCollection().reset(FIXTURE);

//**********************************************************************
function someHandler(newAuthor) {
    console.log("newAuthor:");
    console.log(newAuthor.getDisplayName());
    authors.unshift(newAuthor);
    console.log("num authors:" + authors.length);
}

//**********************************************************************
function main() {
    console.log("page1 loaded");
    // Just showing that you can have multiple top-level react components
    ReactDOM.render(<AddNewAuthor handleNewAuthor={someHandler}/>, document.getElementById('add-new-author'));
    ReactDOM.render(<AuthorList authors={authors}/>, document.getElementById('authors'));
    $("#content1").text("Dynamically changed in one.");
    shared.make_change();
}

//**********************************************************************
$(document).ready(function() {
    main();
});

class Profile extends Backbone.Model {
    static defaults = {
        name    : null,
        gender  : null,
        picture : null
    };
}

let profile = new Profile({
name    : "Toby Pitt",
gender  : "male",
picture : "http://placekitten.com/200/200"
});

console.log(
    "name    : " + profile.get("name") + "\n" +
    "gender  : " + profile.get("gender") + "\n" +
    "picture : " + profile.get("picture")
);
