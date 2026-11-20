
alert("APP.JS CONNECTED SUCCESSFULLY!");


// REUSABLE TOAST NOTIFICATION
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

    // =================================
    // ACTIVITY 7: LIVE BOOKING SUMMARY
    // =================================

    const match = document.getElementById("match");
    const stand = document.getElementById("stand");
    const tickets = document.getElementById("tickets");

    const summaryMatch = document.getElementById("summaryMatch");
    const summaryStand = document.getElementById("summaryStand");
    const summaryTickets = document.getElementById("summaryTickets");
    const totalPrice = document.getElementById("totalPrice");

    // Ticket prices
    const ticketPrices = {
        "General": 500,
        "Premium": 1000,
        "VIP": 2000,
        "Corporate": 3000
    };

    // Function to update booking summary
    function updateBookingSummary() {

        // Read selected values
        const selectedMatch = match.value;
        const selectedStand = stand.value;
        const quantity = Number(tickets.value);

        // Calculate total price
        const price = ticketPrices[selectedStand] || 0;

        const validQuantity =
            Number.isInteger(quantity) &&
            quantity >= 1 &&
            quantity <= 10;

        const total = validQuantity ? price * quantity : 0;

        // Display selected details
        summaryMatch.textContent =
            selectedMatch || "Not Selected";

        summaryStand.textContent =
            selectedStand || "Not Selected";

        summaryTickets.textContent =
            tickets.value || "0";

        totalPrice.textContent = total;

        // Show notification
        showToast("Booking summary updated!");
    }

    // Add change event listeners
    if (match && stand && tickets) {

        match.addEventListener("change", updateBookingSummary);

        stand.addEventListener("change", updateBookingSummary);

        tickets.addEventListener("input", updateBookingSummary);

        // Reset summary when form is reset
        const bookingForm = document.getElementById("bookingForm");

        if (bookingForm) {
            bookingForm.addEventListener("reset", function () {
                setTimeout(updateBookingSummary, 0);
            });
        }
    }

// ACTIVITY 7: SUBMIT BOOKING

if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        // Prevent page reload
        event.preventDefault();

        // Get customer details
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        // Show booking confirmation
        showToast("Booking submitted successfully!");

        alert(
            "Booking Confirmed!\n\n" +
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Match: " + match.value + "\n" +
            "Stand: " + stand.value + "\n" +
            "Tickets: " + tickets.value + "\n" +
            "Total Price: ₹" + totalPrice.textContent
        );

    });

}


    // =================================
    // EXISTING ACTIVITY: SMOOTH SCROLLING
    // =================================

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


    // =================================
    // EXISTING ACTIVITY: BOOK BUTTON
    // =================================

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
