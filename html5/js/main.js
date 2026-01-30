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
    const endpoint = form.getAttribute("data-endpoint") || form.action;

    if (!endpoint || endpoint.includes("your-id")) {
      statusMessage.textContent = "Uzupełnij poprawny adres endpointu formularza.";
      return;
    }

    statusMessage.textContent = "Wysyłanie wiadomości...";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      let responseBody = {};

      try {
        responseBody = await response.json();
      } catch (parseError) {
        responseBody = {};
      }

      if (!response.ok) {
        const errorMessage =
          responseBody?.errors?.map((item) => item.message).join(" ") ||
          responseBody?.error ||
          "Nie udało się wysłać wiadomości.";
        throw new Error(errorMessage);
      }

      statusMessage.textContent = "Dziękuję za wiadomość! Odezwę się wkrótce.";
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Wystąpił błąd podczas wysyłania. Spróbuj ponownie.";
      statusMessage.textContent = message;
    }
  });
}
