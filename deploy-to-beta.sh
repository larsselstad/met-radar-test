#!/bin/bash
echo -e "Running deploy script"

echo -e "On branch: ${TRAVIS_BRANCH}"

echo -e "Is PR: ${TRAVIS_PULL_REQUEST}"

if [ "${TRAVIS_BRANCH}" == "dev" ] && [ "${TRAVIS_PULL_REQUEST}" == "false" ]; then
  echo -e "Deploying to beta server"
  chmod 600 deploy_key
  mv deploy_key ~/.ssh/id_rsa
  git remote add deploy ssh://ci@178.62.103.161/var/repo/met-radar-test-beta.git
  git push deploy dev
  echo -e "Deploy done"
else
  echo -e "This will not deploy!"
  echo -e "The branch is not dev or it is a PR"
fi
