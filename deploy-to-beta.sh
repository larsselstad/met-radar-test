#!/bin/bash
if [ "$TRAVIS_BRANCH" == "dev" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo "Deploying to beta server"
  chmod 600 deploy_key
  mv deploy_key ~/.ssh/id_rsa
  git remote add deploy ssh://ci@178.62.103.161/var/repo/met-radar-test-beta.git
  git push deploy dev
else
  echo "This will not deploy!"
  echo "The branch is not dev or it is a PR"
fi
