function requireLogin(roleRequired = "student") {
  const role = localStorage.getItem("role");

  if (!role || role !== roleRequired) {
    window.location.href = "login.html";
  }
}