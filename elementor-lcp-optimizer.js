/**
 * SSPSEO - Elementor LCP (Largest Contentful Paint) Optimizer
 * Intercetta sia le immagini standard (<img>) che le immagini di sfondo (Container/Section) 
 * above the fold, bypassando il lazy load nativo per abbattere i tempi di LCP.
 */

document.addEventListener("DOMContentLoaded", () => {
  const HIGH_ZONE = 800; // Soglia in px per definire l'area "above the fold"

  // ==========================================
  // 1. OTTIMIZZAZIONE IMMAGINI STANDARD (Tag <img>)
  // ==========================================
  const images = document.querySelectorAll(
    ".elementor-image-box-img img[data-lazyloaded='1'], .elementor-widget-container img[data-lazyloaded='1']"
  );

  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    const isInHighZone = rect.top >= 0 && rect.top < HIGH_ZONE;

    if (isInHighZone) {
      img.setAttribute("data-lazyloaded", "0");

      if (!img.hasAttribute("loading") || img.getAttribute("loading") === "lazy") {
        img.setAttribute("loading", "eager");
      }

      if (!img.hasAttribute("fetchpriority")) {
        img.setAttribute("fetchpriority", "high");
      }
      
      console.log(`[SSPSEO Performance] Immagine LCP ottimizzata: ${img.src || img.dataset.src}`);
      
      if (img.dataset.src && !img.src) {
        img.src = img.dataset.src;
      }
    }
  });

  // ==========================================
  // 2. OTTIMIZZAZIONE BACKGROUND CONTAINERS (e-lazyload)
  // ==========================================
  // Selezioniamo i container che Elementor sta bloccando
  const bgContainers = document.querySelectorAll(".e-lazyload, .e-lazyloaded");

  bgContainers.forEach(container => {
    const rect = container.getBoundingClientRect();
    const isInHighZone = rect.top >= 0 && rect.top < HIGH_ZONE;

    if (isInHighZone) {
      // Rimuovendo queste classi, annulliamo il "background-image: none !important" di Elementor.
      // Il browser scaricherà immediatamente l'immagine di sfondo dal CSS originario.
      container.classList.remove("e-lazyload");
      container.classList.remove("e-lazyloaded");
      
      console.log(`[SSPSEO Performance] Background Container LCP sbloccato.`);
    }
  });

});
