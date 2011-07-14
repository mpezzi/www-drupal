(function ($) {

Drupal.behaviors.facetapi = {
  attach: function(context, settings) {
    // Iterates over facet settings, applies functionality like the "Show more"
    // links for block realm facets.
    // @todo We need some sort of JS API so we don't have to make decisions
    // based on the realm.
    for (var index in settings.facetapi.facets) {
      if ('block' == settings.facetapi.facets[index].realmName) {
        if (null != settings.facetapi.facets[index].makeCheckboxes) {
          // Find all checkbox facet links and give them a checkbox.
          $('a.facetapi-checkbox.facetapi-inactive', context).each(Drupal.facetapi.addCheckbox);
          // Find all unclick links and turn them into checkboxes.
          $('a.facetapi-checkbox.facetapi-active', context).each(Drupal.facetapi.makeCheckbox);
        }
        if (null != settings.facetapi.facets[index].limit) {
          // Applies soft limit to the list.
          Drupal.facetapi.applyLimit(settings.facetapi.facets[index]);
        }
      }
    }
  }
}

/**
 * Class containing functionality for Facet API.
 */
Drupal.facetapi = {}

/**
 * Applies the soft limit to facets in the block realm.
 */
Drupal.facetapi.applyLimit = function(settings) {
  if (settings.limit > 0) {
    
    // Ensures our limit is zero-based, hides facets over the limit.
    var limit = settings.limit - 1;
    $('ul#' + settings.id).find('li:gt(' + limit + ')').hide();
    
    // Adds "Show more" / "Show fewer" links as appropriate.
    $('ul#' + settings.id).filter(function() {
      return $(this).find('li').length > settings.limit;
    }).each(function() {
      $('<a href="#" class="facetapi-limit-link"></a>').text(Drupal.t('Show more')).click(function() {
        if ($(this).prev().find('li:hidden').length > 0) {
          $(this).prev().find('li:gt(' + limit + ')').slideDown();
          $(this).text(Drupal.t('Show fewer'));
        }
        else {
          $(this).prev().find('li:gt(' + limit + ')').slideUp();
          $(this).text(Drupal.t('Show more'));
        }
        return false;
      }).insertAfter($(this));
    });
  }
}

/**
 * Constructor for the facetapi redirect class.
 */
Drupal.facetapi.Redirect = function(href) {
  this.href = href;
}

/**
 * Method to redirect to the stored href.
 */
Drupal.facetapi.Redirect.prototype.gotoHref = function() {
  window.location.href = this.href;
}

Drupal.facetapi.addCheckbox = function() {
  if (!$(this).hasClass('facetapi-checkbox-processed')) {
    // Create an unchecked checkbox.
    var checkbox = $('<input type="checkbox" class="facetapi-checkbox" />');
    // Get the href of the link that is this DOM object.
    var href = $(this).attr('href');
    redirect = new Drupal.facetapi.Redirect(href);
    checkbox.click($.proxy(redirect, 'gotoHref'));
    $(this).before(checkbox).before('&nbsp;');
    $(this).addClass('facetapi-checkbox-processed');
  }
}

Drupal.facetapi.makeCheckbox = function() {
  if (!$(this).hasClass('facetapi-checkbox-processed')) {
    // Create a checked checkbox.
    var checkbox = $('<input type="checkbox" class="facetapi-checkbox" checked="true" />');
    // Get the href of the link that is this DOM object.
    var href = $(this).attr('href');
    redirect = new Drupal.facetapi.Redirect(href);
    checkbox.click($.proxy(redirect, 'gotoHref'));
    // Add the checkbox, hide the link.
    $(this).before(checkbox).hide();
    $(this).addClass('facetapi-checkbox-processed');
  }
}

})(jQuery);
