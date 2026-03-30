async function trackLesson(lesson_id) {
  const student_id = localStorage.getItem("student_id");
  if (!student_id) return;

  await supabase.from("lesson_views").insert([
    { student_id, lesson_id }
  ]);
}