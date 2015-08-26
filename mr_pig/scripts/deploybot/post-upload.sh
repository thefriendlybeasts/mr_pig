# This script is run after uploading files, but before becoming the current running code. See server
# settings on DeployBot site for more info.
#
# Usage:
#   - Add `sh scripts/deploybot/post-upload.sh` to the **Run commands after new version is uploaded**
#     accordion section.
#   - Pop champagne.




# Some needed vars.
# The working dir at this point is `releases/$RELEASE`. This looks in `releases`, lists the last two
# dirs (two most recent releases), and snags the first one (penultimate release).
PREV_RELEASE=$(ls .. | tail -n 2 | head -n 1)
SITE_DIR="html"


# Copy old users, _content, _storage, and assets.
rsync -avv ../$PREV_RELEASE/$SITE_DIR/_config/users $SITE_DIR/_config
rsync -avv ../$PREV_RELEASE/$SITE_DIR/_content $SITE_DIR
rsync -avv ../$PREV_RELEASE/$SITE_DIR/_storage $SITE_DIR
rsync -avv ../$PREV_RELEASE/$SITE_DIR/assets $SITE_DIR


# Set the proper permissions.
chmod -R 777 $SITE_DIR/_cache
chmod -R 777 $SITE_DIR/_content
chmod -R 777 $SITE_DIR/assets
chmod -R 755 $SITE_DIR/_config/users
chmod -R 755 $SITE_DIR/_logs
chmod -R 755 $SITE_DIR/_storage
