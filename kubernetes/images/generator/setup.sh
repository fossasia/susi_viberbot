#!/bin/bash
git clone ${REPOSITORY} susi_viberbot
cd susi_viberbot
git checkout ${BRANCH}

if [ -v COMMIT_HASH ]; then
    git reset --hard ${COMMIT_HASH}
fi

npm install --no-shrinkwrap
