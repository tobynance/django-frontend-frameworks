import * as shared from "./shared";

declare var $: any;

console.log("two_a");
$(document).ready(function() {
    console.log("two_b");
    $("#content1").text("Dynamically changed in two.");
    shared.make_change();
});
