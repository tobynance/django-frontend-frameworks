import * as shared from "./shared";

console.log("one_a");
$(document).ready(function() {
    console.log("one_b");
    $("#content1").text("Dynamically changed in one.");
    shared.make_change();
});
