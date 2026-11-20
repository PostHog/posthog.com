#!/bin/zsh
# Build the mirrored and cropped brand hoggies the site uses, from the @posthog/brand PNGs.
# Rerun after a brand bump: zsh scripts/hog-images/make-derived-hogs.sh (needs ImageMagick)
# Crop boxes are x y width height in the 1000x1000 art, matched to the old hog's framing.
set -e
SRC=node_modules/@posthog/brand/dist/generated/hoggies/png
OUT=src/images/hogs
mkdir -p $OUT
make() { # make <out-name> <brand png> <mirror 0|1> [crop "x y w h"]
    local out=$1 png=$2 mirror=$3 crop=$4 args=()
    if [[ -n $crop ]]; then local c=(${=crop}); args+=(-crop "${c[3]}x${c[4]}+${c[1]}+${c[2]}" +repage); fi
    [[ $mirror == 1 ]] && args+=(-flop)
    magick $SRC/$png $args -strip -define png:compression-level=9 $OUT/$out
    echo "$OUT/$out $(magick identify -format '%wx%h' $OUT/$out)"
}
make hedgehog-float-mirrored.png              float.png          1
make hedgehog-construction-1-mirrored.png     construction-1.png 1
make hedgehog-drake-yah-mirrored.png          drake-yah.png      1
make hedgehog-robot-mirrored.png              robot.png          1
make hedgehog-will-smith-mirrored.png         will-smith.png     1
make hedgehog-wizard-1-mirrored.png           wizard-1.png       1
make hedgehog-book-pile-mirrored-cropped.png  book-pile.png      1 "150 10 700 620"
make hedgehog-996-mirrored-cropped.png        9-9-6.png          1 "70 150 860 550"
make hedgehog-hot-popcorn-cropped.png         popcorn.png        0 "50 40 900 600"
make hedgehog-transformer-cropped.png         transformer.png    0 "170 20 670 930"
make hedgehog-workflows-cropped.png           workflows.png      0 "120 0 760 980"
