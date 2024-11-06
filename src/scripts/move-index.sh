# Fix trailing slash redrect issue on Amplify, Cloudflare, etc.

find ./public -name 'index.html' -mindepth 2 -type f \
    -exec sh \
    -c 'parent="$(dirname "$1")"; mv "$1" "$parent/../$(basename "$parent").html";' \
    find-sh {} \;

find ./public -empty -type d -delete