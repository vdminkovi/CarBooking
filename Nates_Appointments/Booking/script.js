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

    //VALIDATION OF THE FORM
    // Individual field validators
    function validateName() {
      const name = document.getElementById('name');
      const error = document.getElementById('name-error');
      if (name.value.trim() === '') {
        error.textContent = 'Full name is required.';
        name.classList.add('error-border');
        return false;
      } else {
        error.textContent = '';
        name.classList.remove('error-border');
        return true;
      }
    }

    function validatePhone() {
      const phone = document.getElementById('phone');
      const error = document.getElementById('phone-error');
      const pattern = /^[0-9]{10}$/;
      if (!pattern.test(phone.value.trim())) {
        error.textContent = 'Enter a valid 10-digit phone number.';
        phone.classList.add('error-border');
        return false;
      } else {
        error.textContent = '';
        phone.classList.remove('error-border');
        return true;
      }
    }

    function validateEmail() {
      const email = document.getElementById('email');
      const error = document.getElementById('email-error');
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(email.value.trim())) {
        error.textContent = 'Enter a valid email address.';
        email.classList.add('error-border');
        return false;
      } else {
        error.textContent = '';
        email.classList.remove('error-border');
        return true;
      }
    }

    // Full form validator on submit
    function validateForm() {
      const validName = validateName();
      const validPhone = validatePhone();
      const validEmail = validateEmail();
      return validName && validPhone && validEmail;
    }

    // Attach real-time input event listeners
    document.getElementById('name').addEventListener('input', validateName);
    document.getElementById('phone').addEventListener('input', validatePhone);
    document.getElementById('email').addEventListener('input', validateEmail);

  function getFormDataAsJSON() {
    const formData = {
      name: document.getElementById('name').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      email: document.getElementById('email').value.trim(),
      vehicleMake: document.getElementById('vehicle-make').value,
      vehicleModel: document.getElementById('vehicle-model').value,
      vehicleYear: document.getElementById('vehicle-year').value,
      service: document.getElementById('service-select').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time-select').value
    };

    return formData;
  }
    // Form Submission (Basic Example)
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validateForm()) {
            const data = getFormDataAsJSON();
            console.log("📦 JSON object created:", JSON.stringify(data, null, 2));
            bookingForm.reset(); // Clear form after submission
        // Optionally: this.submit();
        }

    });

});