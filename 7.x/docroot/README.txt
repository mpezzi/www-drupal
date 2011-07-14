The document root contains a series of symbolic links which make up the Drupal codebase and file system. 
In it, you'll find links such as index.php, update.php, etc. For example, the .htaccess file is linked 
back to .htaccess -> ../local/common/.htaccess .

Everything in docroot is a symbolic link except the /sites directory, which is simply another directory containing symlinks.

Review the diagram for a detailed example of this concept, including an example of what the output 
of a ls on a command line would look like in that directory.