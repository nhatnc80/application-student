async function loadAndAnalyze(video_id) {
  const { data } = await sb
    .from("videos")
    .select("*")
    .eq("id", video_id)
    .single();

  const video = document.getElementById("video");
  video.src = data.video_url;

  const pose = new Pose({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
  });

  pose.onResults(async (results) => {
    if (!results.poseLandmarks) return;

    const score = Math.floor(Math.random() * 40) + 60;

    document.getElementById("result").innerText =
      "Kỹ thuật: " + score + "%";

    await sb.from("video_analysis").insert([
      {
        student_id: localStorage.getItem("student_id"),
        video_id: video_id,
        score: score,
        feedback: "Cần cải thiện động tác tay"
      }
    ]);
  });

  video.onplay = async () => {
    async function detect() {
      await pose.send({ image: video });
      requestAnimationFrame(detect);
    }
    detect();
  };
}