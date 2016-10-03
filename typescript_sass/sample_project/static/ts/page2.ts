import * as shared from "./shared";

console.log("two_a");
$(document).ready(function() {
    console.log("two_b");
    $("#content").text("Dynamically changed in two.");
    shared.make_change();
});
