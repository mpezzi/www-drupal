The vendor directory contains one directory for each distribution of Drupal core you're managing.

Normally, there would only be one directory (e.g. Acquia Drupal or Pressflow). In some advanced deployments 
using multiple document roots, there could be more. In each directory should be a pure copy of whatever version 
of Drupal your site is using. Symbolic links can now be created to this core directory from your "docroot" directory.