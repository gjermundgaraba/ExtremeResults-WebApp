#!/bin/bash 

# Startup script meant for docker

# Take a backup and use said backup if already created
# This is to make sure that every time we start, the SERVER-URL
# is changed, so that we can change the URL if needed with a restart.
if [ ! -f /tmp/bootstrap.bundle.js ]; then
    cp /usr/src/app/public/bootstrap.bundle.js /tmp/bootstrap.bundle.js
else
    cp /tmp/bootstrap.bundle.js /usr/src/app/public/bootstrap.bundle.js
fi

sed -i -e 's|<!SERVER-URL!>|'$1'|g' /usr/src/app/public/bootstrap.bundle.js

cd /usr/src/app
npm run serveprod
