async function login(email, password) {
  const { data } = await supabase
    .from("students")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (data) {
    localStorage.setItem("student_id", data.id);
    window.location.href = "index.html";
  } else {
    alert("Sai tài khoản");
  }
}