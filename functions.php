<?php

/**
 * Enqueue scripts and styles.
 *
 * @since Celestial 1.0
 */
function celestial_scripts() {

	// Load our main stylesheet.
	wp_enqueue_style( 'bootstrap-style', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css' );
	wp_enqueue_style( 'celestial-style-dist', get_template_directory_uri() . '/dist/style.css');
	wp_enqueue_style( 'celestial-style', get_template_directory_uri() . '/style.css' );

    // Load scripts
	//wp_enqueue_script( 'jquery', 'https://code.jquery.com/jquery-3.2.1.slim.min.js', '20171006', false );
	wp_enqueue_script( 'scrollmagic', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js' , array( 'jquery' ), '1.0', false );
	//wp_enqueue_script( 'popper', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js', array( 'jquery' ), '20171006', false );
    //wp_enqueue_script( 'bootstrap-script', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js', array( 'jquery' ), '20171006', false );

    wp_enqueue_script( 'celestial-script', get_template_directory_uri() . '/dist/app.js' , array(), '1.0', true );

    $url = trailingslashit(home_url());
    $path = parse_url($url, PHP_URL_PATH);

    wp_scripts()->add_data('celestial-script', 'data', sprintf('var CelestialSettings = %s;', wp_json_encode([
        'title' => get_bloginfo('name', 'display'),
        'description' => get_bloginfo('description'),
        'path'  => $path,
        'URL'   => [
            'api'  => esc_url_raw(get_rest_url(null, '/wp/v2')),
            'root' => esc_url_raw($url),
        ]
    ])));
}

if (!function_exists('celestial_setup')) :
    function celestial_setup()
    {
        add_theme_support('title-tag');
    }
endif;

add_action('after_setup_theme', 'celestial_setup');
add_action('wp_enqueue_scripts', 'celestial_scripts');

// Add various fields to the JSON output
function celestial_register_fields()
{
    // Add Author Name
    register_rest_field('post',
        'author_name',
        [
            'get_callback'    => 'celestial_get_author_name',
            'update_callback' => null,
            'schema'          => null
        ]
    );

    // Add Featured Image
    register_rest_field('post',
        'featured_image_src',
        [
            'get_callback'    => 'celestial_get_image_src',
            'update_callback' => null,
            'schema'          => null
        ]
    );

    // Add Published Date
    register_rest_field('post',
        'published_date',
        [
            'get_callback'    => 'celestial_published_date',
            'update_callback' => null,
            'schema'          => null
        ]
    );

    register_rest_route('wp/v2', '/menu', [
        'methods'  => 'GET',
        'callback' => function () {
            return wp_get_nav_menu_items('Main');
        },
    ]);
}

add_action('rest_api_init', 'celestial_register_fields');

function celestial_get_author_name()
{
    return get_the_author_meta('display_name');
}

function celestial_get_image_src($object)
{
    if ($object['featured_media'] == 0) {
        return null;
    }
    $feat_img_array = wp_get_attachment_image_src($object['featured_media'], 'thumbnail', true);
    return $feat_img_array[0];
}

function celestial_published_date()
{
    return get_the_time('F j, Y');
}

add_filter('excerpt_length', function () { return 20; });

// Defer scripst for performance

function add_script_attr($tag, $handle, $src)
{
    if (in_array($handle, ['celestial-style-dist', 'celestial-style', 'celestial-script'])) {
        $tag = str_replace('src=', 'sync="false" src=', $tag);
    }
    return $tag;
}


function add_style_attr($tag, $handle, $src)
{
    if (in_array($handle, ['celestial-style-dist', 'celestial-style', 'celestial-script'])) {
        $tag = str_replace('href=', 'sync="false" href=', $tag);
    }
    return $tag;
}

add_filter('script_loader_tag', 'add_script_attr', 10, 3);
add_filter('style_loader_tag', 'add_style_attr', 10, 3);
add_filter( 'excerpt_length', 'celestial_excerpt_length' );

/**
 * Add Theme Support
 *
 * @see https://developer.wordpress.org/reference/functions/add_theme_support/
 */
add_theme_support( 'post-thumbnails' );
