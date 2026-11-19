
alert("APP.JS CONNECTED SUCCESSFULLY!");

function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {
            const target = document.querySelector(link.getAttribute("href"));

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

                showToast("Scrolling to " + target.id);
            }
        });
    });

    // Book button notification
    document.querySelectorAll(".book-btn").forEach(function (button) {

        button.addEventListener("click", function (event) {
            event.preventDefault();

            const page = button.href;

            showToast("Opening ticket booking page!");

            setTimeout(function () {
                window.location.href = page;
            }, 1500);
        });
    });

});
