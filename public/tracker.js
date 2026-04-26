(function () {
  const script = document.currentScript;
  const siteId = script.getAttribute("data-site-id");

  fetch("https://analytics-e5ih.onrender.com/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      site_id: siteId,
      url: window.location.href,
      referrer: document.referrer || "direct",
    }),
  });
})();