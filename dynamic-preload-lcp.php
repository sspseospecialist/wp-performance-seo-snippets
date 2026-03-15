<?php
/**
 * SSPSEO - Dynamic Resource Preloader
 * * Dynamically injects <link rel="preload"> in the <head> for the Post/Page Featured Image
 * and critical local fonts to minimize render-blocking delays.
 */

add_action( 'wp_head', 'sspseo_dynamic_critical_preload', 1 );

function sspseo_dynamic_critical_preload() {
    // 1. DYNAMIC FEATURED IMAGE PRELOAD (LCP)
    if ( is_single() || is_page() ) {
        // Get the URL of the featured image (full size for desktop hero)
        $lcp_image_url = get_the_post_thumbnail_url( get_the_ID(), 'full' );
        
        if ( $lcp_image_url ) {
            // Inject preload with high fetchpriority
            echo '';
            echo '<link rel="preload" as="image" href="' . esc_url( $lcp_image_url ) . '" fetchpriority="high">';
        }
    }

    // 2. CRITICAL FONTS PRELOAD
    // Replace with your actual font paths. Crossorigin is mandatory for fonts.
    $font_path = get_stylesheet_directory_uri() . '/assets/fonts/primary-font-bold.woff2';
    
    echo '';
    echo '<link rel="preload" href="' . esc_url( $font_path ) . '" as="font" type="font/woff2" crossorigin="anonymous">';
    
    // 3. LOGO PRELOAD (Optional, if logo is the LCP on homepage)
    if ( is_front_page() ) {
        $logo_url = wp_get_attachment_image_url( get_theme_mod( 'custom_logo' ), 'full' );
        if ( $logo_url ) {
            echo '<link rel="preload" as="image" href="' . esc_url( $logo_url ) . '" fetchpriority="high">';
        }
    }
}
