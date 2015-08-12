# Usage:
#   - Add `sh scripts/deploybot/compile.sh` to the **Compile, compress, or minimize your code**
#     accordion section.
#   - Dance and rejoice in the knowledge that you are a better person.





# Build that baby.
grunt build


# Now that the baby is complete, we don't wanna serve the old one up. Get rid of it and replace it
# with the built version.
SITE_DIR="html"
DIST="dist"

rm -R $SITE_DIR
mv $DIST $SITE_DIR
