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

document.querySelector('.credit-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Stop the default form submission

  // Gather the form data
  const formData = {
    cardName: document.querySelector('input[name="cardName"]').value,
    cardNumber: document.querySelector('input[name="cardNumber"]').value,
    expiry: document.querySelector('input[name="expiry"]').value,
    CVV: document.querySelector('input[name="CVV"]').value,
    email: document.querySelector('input[name="email"]').value
  };

  try {
    // Send POST request
    const response = await fetch('https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      // If the server responds successfully
      window.location.href = 'thankyou.html'; // Redirect to thank you page
    } else {
      alert('Error submitting payment. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Network error. Please try again.');
  }
});

  