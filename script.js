const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});


const navLinks = document.querySelectorAll(".navbar__link");

navLinks.forEach(link => {

    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove("active");
        }
    });

});


const themeToggle = document.getElementById("theme-toggle");
const body = document.body;


const savedTheme = localStorage.getItem("theme");


if (savedTheme === "dark") {

    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";

} else if (savedTheme === "light") {

    body.classList.add("light-mode");

}


themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark-mode");
    body.classList.remove("light-mode");


    if (body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";

    } else {

        localStorage.setItem("theme", "light");
        body.classList.add("light-mode");
        themeToggle.textContent = "🌙";

    }

});
