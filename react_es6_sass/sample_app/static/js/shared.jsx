console.log("shared_a");

export function make_change() {
    console.log("shared_b");
    $("#content2").text("Dynamically changed in shared.");
}
