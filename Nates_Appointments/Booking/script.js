document.addEventListener("DOMContentLoaded", function () {
    const makeDropdown = document.getElementById("vehicle-make");
    const modelDropdown = document.getElementById("vehicle-model");
    const yearDropdown = document.getElementById("vehicle-year");
    const bookingForm = document.getElementById("booking-form");

    // Most popular vehicle makes (instead of fetching all makes)
    const popularMakes = [
        "Toyota", "Honda", "Ford", "Chevrolet", "Nissan",
        "Jeep", "BMW", "Mercedes-Benz", "Hyundai", "Kia",
        "Volkswagen", "Subaru", "Mazda", "Lexus", "Dodge",
        "Ram", "GMC", "Tesla", "Audi", "Cadillac"
    ];

    // Populate Make Dropdown with predefined makes
    popularMakes.forEach(make => {
        const option = document.createElement("option");
        option.value = make;
        option.textContent = make;
        makeDropdown.appendChild(option);
    });

    // Generate Year options (Last 30 years)
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 30; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        yearDropdown.appendChild(option);
    }

    // Fetch vehicle models based on selected make
    makeDropdown.addEventListener("change", function () {
        const selectedMake = makeDropdown.value;
        modelDropdown.innerHTML = '<option value="">Select Model</option>'; // Reset models

        if (selectedMake) {
            fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${selectedMake}?format=json`)
                .then(response => response.json())
                .then(data => {
                    const models = data.Results.map(model => model.Model_Name);
                    populateDropdown(modelDropdown, models);
                });
        }
    });

    // Function to populate dropdown options
    function populateDropdown(dropdown, items) {
        items.forEach(item => {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            dropdown.appendChild(option);
        });
    }

    // // Phone number validation (ensures only numbers)
    // if (phoneInput) {
    //     phoneInput.addEventListener("input", function (e) {
    //         this.value = this.value.replace(/\D/g, ''); // Ensures only numbers are entered
    //     });
    // } else {
    //     console.error("Phone input field not found in the DOM.");
    // }

    // Form Submission (Basic Example)
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Appointment booked successfully!");
        bookingForm.reset(); // Clear form after submission
    });

});