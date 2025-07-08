document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");

    const services = [
        { name: "Oil Change", price: "$30 - $60" },
        { name: "Brake Inspection", price: "$40 - $80" },
        { name: "Tire Rotation", price: "$25 - $50" },
        { name: "Battery Replacement", price: "$100 - $200" },
        { name: "Engine Diagnostic", price: "$50 - $100" }
    ];

    const servicesContainer = document.getElementById("services-list");
    const bookingDropdown = document.getElementById("service-select");

    if (servicesContainer) {
        services.forEach(service => {
            const card = document.createElement("div");
            card.className = "service-card";
            card.innerHTML = `<h3>${service.name}</h3><p>Price: ${service.price}</p>`;
            servicesContainer.appendChild(card);
        });
    }

    if (bookingDropdown) {
        services.forEach(service => {
            const option = document.createElement("option");
            option.value = service.name;
            option.textContent = `${service.name} - ${service.price}`;
            bookingDropdown.appendChild(option);
        });
    }
});
