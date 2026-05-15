(function () {
  const STORAGE_KEY = "medical_booster_cookie_consent_v1";

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function saveConsent(value) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...value,
        savedAt: new Date().toISOString()
      })
    );
  }

  ready(function () {
    const popup = document.getElementById("mb-cookie-consent");
    const manageButton = document.getElementById("mb-cookie-manage");
    const rejectButton = document.getElementById("mb-cookie-reject");
    const acceptButton = document.getElementById("mb-cookie-accept");
    const saveButton = document.getElementById("mb-cookie-save");
    const preferencesPanel = document.getElementById("mb-cookie-preferences");
    const analyticsInput = document.getElementById("mb-cookie-analytics");
    const marketingInput = document.getElementById("mb-cookie-marketing");

    if (!popup) return;

    const existingConsent = localStorage.getItem(STORAGE_KEY);

    if (!existingConsent) {
      popup.classList.remove("hidden");
    }

    manageButton?.addEventListener("click", function () {
      preferencesPanel?.classList.toggle("hidden");
    });

    rejectButton?.addEventListener("click", function () {
      saveConsent({
        necessary: true,
        analytics: false,
        marketing: false,
        action: "reject_optional"
      });
      popup.classList.add("hidden");
    });

    acceptButton?.addEventListener("click", function () {
      saveConsent({
        necessary: true,
        analytics: true,
        marketing: true,
        action: "accept_all"
      });
      popup.classList.add("hidden");
    });

    saveButton?.addEventListener("click", function () {
      saveConsent({
        necessary: true,
        analytics: Boolean(analyticsInput?.checked),
        marketing: Boolean(marketingInput?.checked),
        action: "save_preferences"
      });
      popup.classList.add("hidden");
    });
  });
})();
