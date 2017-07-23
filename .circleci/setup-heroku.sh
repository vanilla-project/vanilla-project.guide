#!/bin/bash -eo pipefail
git remote add heroku https://git.heroku.com/vanilla-project-staging.git
wget https://cli-assets.heroku.com/branches/stable/heroku-linux-amd64.tar.gz
tar -xzf heroku-linux-amd64.tar.gz

cat > ~/.netrc << EOF
machine api.heroku.com
  login $HEROKU_LOGIN
  password $HEROKU_API_KEY
machine git.heroku.com
  login $HEROKU_LOGIN
  password $HEROKU_API_KEY
EOF

