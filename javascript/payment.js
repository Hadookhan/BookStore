document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", function (e) {
      const expiryInput = document.querySelector("input[name='expiry']").value.trim();
      
      // Check format MM/YY
      const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!regex.test(expiryInput)) {
        alert("Please enter expiry date in MM/YY format.");
        e.preventDefault();
        return;
      }
  
      const [month, year] = expiryInput.split("/");
      const inputMonth = parseInt(month, 10);
      const inputYear = parseInt("20" + year, 10); // Convert to full year like 2026
  
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();
  
      if (
        inputYear < currentYear ||
        (inputYear === currentYear && inputMonth < currentMonth)
      ) {
        alert("Your card is expired.");
        e.preventDefault();
      }
    });
    const expiryField = document.querySelector("input[name='expiry']");

    expiryField.addEventListener("input", function (e) {
    let value = expiryField.value.replace(/\D/g, ""); // Remove non-digits

    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    expiryField.value = value;
    });

    expiryField.addEventListener("keydown", function (e) {
        if (e.key === "Backspace") {
          const val = expiryField.value;
          if (val.endsWith("/")) {
            expiryField.value = val.slice(0, -1);
            e.preventDefault(); // stop extra backspace
          }
        }
    });
  });
  