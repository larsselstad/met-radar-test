#!/bin/bash
echo -e "Running deploy script"

echo -e "On branch: ${TRAVIS_BRANCH}"

echo -e "Is PR: ${TRAVIS_PULL_REQUEST}"

echo -e "Deploying to beta server"

git remote add deploy ssh://ci@178.62.103.161/var/repo/met-radar-test-beta.git
git push deploy dev

echo -e "Deploy done"
