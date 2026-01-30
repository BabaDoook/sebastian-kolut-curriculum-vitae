const scrollButtons = document.querySelectorAll("[data-scroll]");
const form = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-status");
const yearSpan = document.getElementById("year");

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-scroll");
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

if (form && statusMessage) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    statusMessage.textContent = "Wysyłanie wiadomości...";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Nie udało się wysłać wiadomości.");
      }

      statusMessage.textContent = "Dziękuję za wiadomość! Odezwę się wkrótce.";
      form.reset();
    } catch (error) {
      statusMessage.textContent = "Wystąpił błąd podczas wysyłania. Spróbuj ponownie.";
    }
  });
}
