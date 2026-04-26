(function () {
  const site_id = "test123";

  function getDevice() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return "mobile";
    if (/tablet/i.test(ua)) return "tablet";
    return "desktop";
  }

  function getUTM() {
    const params = new URLSearchParams(window.location.search);

    return {
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_term: params.get("utm_term"),
      utm_content: params.get("utm_content"),
    };
  }

  fetch("https://analytics-e5ih.onrender.com/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      site_id: site_id,
      url: window.location.href,
      referrer: document.referrer || "direct",
      device: getDevice(),
      ...getUTM(),
    }),
  }).catch(() => {});
})();