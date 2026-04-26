(function () {
  const script = document.currentScript;
  const siteId = script.getAttribute("data-site-id");

  if (!siteId) return;

  fetch("https://analytics.xyra.media/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      site_id: siteId,
      url: window.location.href,
      referrer: document.referrer,
      timestamp: Date.now()
    })
  });
})();