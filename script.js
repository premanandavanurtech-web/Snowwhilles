function loadHTML(elementId, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load " + filePath);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch(error => {
      console.error(error);
    });
}

// Load Header & Footer
document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "components/header.html");
  loadHTML("footer", "components/footer.html");
});
