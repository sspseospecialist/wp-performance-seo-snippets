/**
 * SSPSEO - Elementor LCP (Largest Contentful Paint) Optimizer
 * * Intercepts images above the fold (Hero section) and forces immediate loading
 * bypassing Elementor/WP native lazy load to drastically improve LCP metrics.
 * Adds fetchpriority="high" and loading="eager".
 */

document.addEventListener("DOMContentLoaded", () => {
  const HIGH_ZONE = 800; // Threshold in px to define the "above the fold" area

  // Select images inside Elementor containers that are flagged for lazy loading
  const images = document.querySelectorAll(
    ".elementor-image-box-img img[data-lazyloaded='1'], .elementor-widget-container img[data-lazyloaded='1']"
  );

  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    const isInHighZone = rect.top >= 0 && rect.top < HIGH_ZONE;

    if (isInHighZone) {
      // Disable lazy loading attribute
      img.setAttribute("data-lazyloaded", "0");

      // Force eager loading
      if (!img.hasAttribute("loading") || img.getAttribute("loading") === "lazy") {
        img.setAttribute("loading", "eager");
      }

      // Add fetchpriority high for modern browsers
      if (!img.hasAttribute("fetchpriority")) {
        img.setAttribute("fetchpriority", "high");
      }
      
      console.log(`[SSPSEO Performance] LCP Image optimized: ${img.src || img.dataset.src}`);
      
      // If data-src is used, swap it immediately to trigger the download
      if (img.dataset.src && !img.src) {
        img.src = img.dataset.src;
      }
    }
  });
});
