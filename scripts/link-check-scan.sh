#!/usr/bin/env bash
set -u
RESULTS_DIR="${1:?usage: link-check-scan.sh <results-dir> [--minimal-build]}"
PRODUCTION_SITEMAP_URL="https://posthog.com/sitemap/sitemap-0.xml"
FINDINGS_EXIT=1
mkdir -p "$RESULTS_DIR"

if [ "${2:-}" = "--minimal-build" ]; then
    export LINK_CHECK_FULL_SITEMAP="$RESULTS_DIR/production-sitemap.xml"
    curl -fsSL --retry 3 --max-time 60 "$PRODUCTION_SITEMAP_URL" -o "$LINK_CHECK_FULL_SITEMAP" || exit 2
fi

STATUS=0
for SCANNER in check-links-post-build check-src-links; do
    node "scripts/$SCANNER.js" "$RESULTS_DIR" > "$RESULTS_DIR/$SCANNER.log" 2>&1
    CODE=$?
    tail -n 30 "$RESULTS_DIR/$SCANNER.log"
    if [ "$CODE" -gt "$FINDINGS_EXIT" ]; then STATUS=2; fi
done
exit "$STATUS"
