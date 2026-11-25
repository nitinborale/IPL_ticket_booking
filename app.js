
document.addEventListener("DOMContentLoaded", function () {

    console.log("JavaScript Started");

    // 1. HAMBURGER MENU
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            console.log("Menu clicked");
        });

    }


    // 2. TEAM FILTER
    const teamFilter = document.getElementById("teamFilter");
    const matchCards = document.querySelectorAll(".match-card");

    if (teamFilter) {

        teamFilter.addEventListener("change", function () {

            const selectedTeam = teamFilter.value;

            matchCards.forEach(function (card) {

                const teams = card.dataset.team.split(" ");

                if (
                    selectedTeam === "all" ||
                    teams.includes(selectedTeam)
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

            console.log("Team selected:", selectedTeam);

        });

    }


    // 3. GRID AND LIST VIEW
    const gridBtn = document.getElementById("gridBtn");
    const listBtn = document.getElementById("listBtn");
    const matchContainer = document.getElementById("matchContainer");


    if (gridBtn && matchContainer) {

        gridBtn.addEventListener("click", function () {
            matchContainer.classList.remove("list-view");
            console.log("Grid View activated");
        });

    }


    if (listBtn && matchContainer) {

        listBtn.addEventListener("click", function () {
            matchContainer.classList.add("list-view");
            console.log("List View activated");
        });

    }

    console.log("JavaScript functions initialized");

});
