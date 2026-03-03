if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(reg => console.log("Service Worker Registered:", reg.scope))
      .catch(err => console.log("Service Worker Failed:", err));
  });
}

// Simple cart: store last clicked item in localStorage and open cart page
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      if (!card) return;

      const item = {
        name: card.getAttribute("data-name"),
        price: card.getAttribute("data-price"),
        availability: card.getAttribute("data-availability"),
        image: card.getAttribute("data-image"),
      };

      localStorage.setItem("selectedFlower", JSON.stringify(item));

      // open the cart page (same tab)
      window.location.href = "cart.html";
    });
  });
});