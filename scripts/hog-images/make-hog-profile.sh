#!/bin/zsh
# Rebuild hog-profile.png: @posthog/brand "sitting" hoggie, cropped to a bust, on a #FF906E circle.
# Same format as the old hog-9.png avatar (round, transparent corners), at 400x400.
# Usage (from repo root): zsh scripts/hog-images/make-hog-profile.sh (needs ImageMagick)
set -e
SRC=node_modules/@posthog/brand/dist/generated/hoggies/png/sitting.png
OUT=src/images/hog-profile.png
TMP=$(mktemp -d)
# Crop window, in source pixels (1000x1000 source; negative values reach into transparent padding).
X=-10 Y=-60 S=880 PAD=300
magick -size 400x400 xc:none -fill "#FF906E" -draw "circle 199.5,199.5 199.5,0" $TMP/bg.png
magick $SRC -bordercolor none -border $PAD -crop ${S}x${S}+$((X+PAD))+$((Y+PAD)) +repage -resize 400x400 $TMP/crop.png
magick -size 400x400 xc:black -fill white -draw "circle 199.5,199.5 199.5,0" $TMP/mask.png
magick $TMP/bg.png $TMP/crop.png -composite $TMP/mask.png -alpha off -compose CopyOpacity -composite -strip -define png:compression-level=9 $OUT
rm -rf $TMP
magick identify $OUT
