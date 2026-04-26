const device = navigator.userAgent;

fetch("https://ipapi.co/json/")
  .then(res => res.json())
  .then(ip => {
    fetch("https://analytics-e5ih.onrender.com/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        site_id: siteId,
        url: window.location.href,
        referrer: document.referrer || "direct",
        country: ip.country_name,
        device: device
      })
    });
  });