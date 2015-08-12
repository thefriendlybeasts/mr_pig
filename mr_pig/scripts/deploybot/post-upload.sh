# This script is run after uploading files, but before becoming the current running code. See server
# settings on DeployBot site for more info.
#
# Usage:
#   - Add `sh scripts/deploybot/post-upload.sh` to the **Run commands after new version is uploaded**
#     accordion section.
#   - Pop champagne.





# Set the proper permissions.
SITE_DIR="html"

chmod -R 777 $SITE_DIR/_cache
chmod -R 777 $SITE_DIR/_content
chmod -R 777 $SITE_DIR/assets
chmod -R 755 $SITE_DIR/_config/users
chmod -R 755 $SITE_DIR/_logs
chmod -R 755 $SITE_DIR/_storage
