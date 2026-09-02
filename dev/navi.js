(function () {
  "use strict";

  // Na'Vi test image
  const NAVI_IMAGE =
    "https://d1yei2z3i6k35z.cloudfront.net/10602272/6a9802a28dcee0.81540527_Na-vi.gif";

  // Find the location where Na'Vi should appear
  const container = document.getElementById("navi-companion");

  if (!container) {
    console.warn("Na'Vi: #navi-companion was not found on this page.");
    return;
  }

  // Create the Na'Vi image
  const image = document.createElement("img");

  image.src = NAVI_IMAGE;
  image.alt = "Na'Vi — CONTROL Companion";

  image.style.width = "120px";
  image.style.height = "auto";
  image.style.cursor = "pointer";
  image.style.display = "block";

  // Create the test message
  const message = document.createElement("div");

  message.innerHTML = `
    <strong>Hi, I'm Na’Vi 👋</strong>
    <p>This is a test of your CONTROL Companion.</p>
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

  // Click Na'Vi → open message
  image.addEventListener("click", function () {
    message.style.display = "block";
  });

  // Close message
  message.querySelector("button").addEventListener("click", function () {
    message.style.display = "none";
  });

  // Add everything to the container
  container.appendChild(message);
  container.appendChild(image);

})();