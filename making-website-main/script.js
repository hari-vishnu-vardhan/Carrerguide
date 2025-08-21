// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    // ROADMAP ITEMS CLICK - Navigate to corresponding page
    document.querySelectorAll(".roadmap-item").forEach(item => {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = this.getAttribute("href");
      });
    });
  
    // TOGGLE ROADMAPS SECTION (if applicable)
    const roadmapsLink = document.getElementById("roadmaps-link");
    const roadmapsContainer = document.getElementById("roadmap-vertical");
  
    if (roadmapsLink && roadmapsContainer) {
      roadmapsLink.addEventListener("click", function (event) {
        event.preventDefault();
        roadmapsContainer.style.display =
          roadmapsContainer.style.display === "none" ? "block" : "none";
      });
    }
  
    // LOGOUT FUNCTIONALITY
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function (event) {
        event.preventDefault();
  
        // Clear token or session data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
  
        alert("👋 You have been logged out.");
        window.location.href = "login.html";
      });
    }
  
    // (Optional) LOGIN GUARD
    // Redirect if not logged in (e.g., token not found)
    if (!localStorage.getItem("token")) {
      alert("Please log in first.");
      window.location.href = "login.html";
    }
  });
  