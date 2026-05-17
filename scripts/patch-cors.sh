#!/bin/bash
for f in node_modules/.bun/@expo+cli@*/node_modules/@expo/cli/build/src/start/server/middleware/CorsMiddleware.js; do
  if [ -f "$f" ]; then
    sed -i 's/if (!isSameOrigin && !isAllowedHost) {/if (false \&\& !isSameOrigin \&\& !isAllowedHost) {/' "$f"
  fi
done
echo "Patched Expo CorsMiddleware"
