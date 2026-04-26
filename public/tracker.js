const device = navigator.userAgent;

(function () {
  const site_id = "test123"; // ✅ DEFINE IT HERE

  fetch("https://analytics-e5ih.onrender.com/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      site_id: site_id,
      url: window.location.href,
      referrer: document.referrer || "direct",
    }),
  }).catch(err => console.log("Tracking failed:", err));
})();