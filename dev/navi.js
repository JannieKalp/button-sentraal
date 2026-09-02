(function () {
  "use strict";

  const NAVI_IMAGE =
    "https://d1yei2z3i6k35z.cloudfront.net/10602272/6a9802a28dcee0.81540527_Na-vi.gif";

  const container = document.getElementById("navi-companion");

  if (!container) {
    console.warn("Na’Vi: #navi-companion was not found on this page.");
    return;
  }

  // Read information supplied by the Systeme.io page
  const page = container.dataset.naviPage || "unknown-page";
  const context = container.dataset.naviContext || "general";

  // Create Na’Vi image
  const image = document.createElement("img");

  image.src = NAVI_IMAGE;
  image.alt = "Na’Vi — CONTROL Companion";

  image.style.width = "120px";
  image.style.height = "auto";
  image.style.cursor = "pointer";
  image.style.display = "block";

  // Create test message
  const message = document.createElement("div");

  message.innerHTML = `
    <strong>Hi, I'm Na’Vi 👋</strong>

    <p>
      This is a page-awareness test.
    </p>

    <p>
      <strong>Page:</strong> ${page}<br>
      <strong>Context:</strong> ${context}
    </p>

    <button type="button">Close</button>
  `;

  message.style.display = "none";
  message.style.width = "280px";
  message.style.padding = "16px";
  message.style.marginBottom = "10px";
  message.style.background = "#ffffff";
  message.style.borderRadius = "16px";
  message.style.boxShadow = "0 8px 30px rgba(0,0,0,0.18)";
  message.style.fontFamily = "Arial, sans-serif";
  message.style.fontSize = "14px";
  message.style.lineHeight = "1.5";
  message.style.boxSizing = "border-box";

  // Click Na’Vi → open message
  image.addEventListener("click", function () {
    message.style.display = "block";
  });

  // Close message
  message.querySelector("button").addEventListener("click", function () {
    message.style.display = "none";
  });

  // Add Na’Vi to the Systeme.io location
  container.appendChild(message);
  container.appendChild(image);

})();