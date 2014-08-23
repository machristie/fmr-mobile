# FuelMyRoute Mobile Site

jQuery Mobile website for [FuelMyRoute](http://fuelmyroute.com).

# Installing

[Install bower](http://bower.io/), clone this repo, then run

    bower install

## Bower Notes

* **Upgrading jQuery Mobile Version**: When upgrading the version of
  jquery-mobile-bower in `bower.json`, make sure to update the version number in
  `require.config` in `main.js` as well.

# Additional resources

* Uses https://github.com/machristie/backbone-jquerymobile as a starting template

# Post-update hook

    #!/bin/sh

    cd $HOME/dev/fmr-mobile || exit
    unset GIT_DIR
    git pull origin master
    ./build.sh

Credit goes to http://danbarber.me/using-git-for-deployment/ for inspiration.
