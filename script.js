/* Shared behavior for every page. You should NOT need to edit this file
   per client — everything client-specific lives in config.js. */

(function () {
  const fullAddress = `${BIZ.addressLine1}, ${BIZ.addressLine2}`;
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(fullAddress);

  /* ---- 1. Fill in business info everywhere ------------------------- */

  // Any element with data-biz="name" / "city" / "phoneDisplay" / etc.
  // gets its text replaced with the value from config.js.
  document.querySelectorAll("[data-biz]").forEach((el) => {
    const val = BIZ[el.dataset.biz];
    if (val) el.textContent = val;
  });

  // Links: data-biz-link="tel" | "sms" | "email" | "maps" | "instagram"
  document.querySelectorAll("[data-biz-link]").forEach((el) => {
    const kind = el.dataset.bizLink;
    if (kind === "tel") el.href = "tel:" + BIZ.phone;
    if (kind === "sms") el.href = "sms:" + BIZ.phone;
    if (kind === "email") el.href = "mailto:" + BIZ.email;
    if (kind === "maps") el.href = mapsUrl;
    if (kind === "instagram") {
      if (BIZ.instagram) el.href = BIZ.instagram;
      else el.style.display = "none"; // hide button if no Instagram
    }
  });

  // Page title: swap the "Business Name" placeholder for the real name
  document.title = document.title.replaceAll("Business Name", BIZ.name);

  // Meta description (the text under your Google search result)
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = metaDesc.content.replace(
    /Business Name/g, BIZ.name
  ).replace("One sentence describing the business and what it offers.", BIZ.seoDescription);

  // Google Maps embed (contact page): point the iframe at the real address
  const mapFrame = document.getElementById("map-embed");
  if (mapFrame) {
    mapFrame.src =
      "https://maps.google.com/maps?q=" +
      encodeURIComponent(fullAddress) +
      "&z=15&output=embed";
  }

  /* ---- 2. Footer — same on every page, built automatically --------- */

  document.querySelectorAll("footer").forEach((f) => {
    f.innerHTML =
      `<div>${BIZ.name} · ${fullAddress} · ` +
      `<a href="tel:${BIZ.phone}" style="color:inherit">${BIZ.phoneDisplay}</a></div>` +
      `<div style="margin-top:4px;">© ${new Date().getFullYear()} ${BIZ.name}. All rights reserved.</div>`;
  });

  /* ---- 3. Highlight the current page in the nav automatically ------ */

  const here = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav a").forEach((a) => {
    if (a.getAttribute("href") === here) a.classList.add("is-active");
  });

  /* ---- 4. SEO: tell Google this is a local business ---------------- */

  const schema = {
    "@context": "https://schema.org",
    "@type": BIZ.schemaType,
    name: BIZ.name,
    description: BIZ.seoDescription,
    telephone: BIZ.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: BIZ.addressLine1,
      addressLocality: BIZ.addressLine2,
    },
    url: location.origin,
  };
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify(schema);
  document.head.appendChild(ld);

  /* ---- 5. Fade sections in as they scroll into view ---------------- */

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".fade-in").forEach((el) => {
    if (reduceMotion) { el.classList.add("is-visible"); return; }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(el);
  });

  /* ---- 6. Gallery lightbox — click any photo to view it large ------ */

  const galleryImgs = document.querySelectorAll(".gallery-grid img, .home-photos img");
  if (galleryImgs.length) {
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML = "<img alt=''><button class='lightbox-close' aria-label='Close'>×</button>";
    document.body.appendChild(overlay);
    const bigImg = overlay.querySelector("img");

    galleryImgs.forEach((img) => {
      img.addEventListener("click", () => {
        bigImg.src = img.src;
        overlay.classList.add("is-open");
      });
    });
    const close = () => overlay.classList.remove("is-open");
    overlay.addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }
  /* ---- 7. Hero video -------------------------------------------------
     The hero starts as a normal plain hero. Only once hero.mp4 has
     actually loaded a frame do we switch on video mode. That way a
     missing or broken video file can never leave a black box on the
     homepage — it just stays the plain hero. */

  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo) {
    const hero = heroVideo.closest(".hero");

    const enableVideo = () => {
      hero.classList.add("hero--video");
      heroVideo.play().catch(() => {}); // some browsers need a nudge
    };

    if (heroVideo.readyState >= 2) {
      enableVideo();                                  // already loaded
    } else {
      heroVideo.addEventListener("loadeddata", enableVideo, { once: true });
    }

    // If it errors out (file missing, bad format), remove it entirely
    heroVideo.addEventListener("error", () => heroVideo.remove(), { once: true });
  }
})();
