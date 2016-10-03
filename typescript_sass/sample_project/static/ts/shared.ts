console.log("shared_a");

export function make_change() {
    console.log("shared_b");
    $("#content").text("Dynamically changed in shared.");
}
