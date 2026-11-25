
document.addEventListener("DOMContentLoaded", function () {

    console.log("Booking JavaScript Started");

    // Get booking form elements
    const form = document.getElementById("bookingForm");

    if (!form) {
        console.log("Booking form not found");
        return;
    }

    const match = document.getElementById("match");
    const stand = document.getElementById("stand");
    const tickets = document.getElementById("tickets");

    const summaryMatch = document.getElementById("summaryMatch");
    const summaryStand = document.getElementById("summaryStand");
    const summaryTickets = document.getElementById("summaryTickets");
    const totalPrice = document.getElementById("totalPrice");

    // Sample ticket prices
    const prices = {
        General: 500,
        Premium: 1000,
        VIP: 2000,
        Corporate: 5000
    };

    // Update booking summary
    function updateSummary() {

        const selectedMatch =
            match.options[match.selectedIndex].text;

        const selectedStand = stand.value;

        const quantity = Number(tickets.value) || 0;

        const price = prices[selectedStand] || 0;

        const total = price * quantity;

        summaryMatch.textContent =
            match.value ? selectedMatch : "Not Selected";

        summaryStand.textContent =
            selectedStand || "Not Selected";

        summaryTickets.textContent = quantity;

        totalPrice.textContent = total;
    }

    // Listen for changes
    match.addEventListener("change", updateSummary);

    stand.addEventListener("change", updateSummary);

    tickets.addEventListener("input", updateSummary);

    // Submit booking
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        updateSummary();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        alert("Booking submitted successfully!");

        console.log("Booking submitted");
    });

    // Reset booking form
    form.addEventListener("reset", function () {

        setTimeout(function () {
            updateSummary();
        }, 0);

    });

    console.log("Booking functions connected successfully");

});
