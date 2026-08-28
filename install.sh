#!/usr/bin/env bash
# 构建并把产物实拷到 Tabby plugins 目录(不做软链)
# Tabby 只加载包名以 tabby- / terminus- 开头的插件
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
PLUGINS_ROOT="${HOME}/Library/Application Support/tabby/plugins"
NM="${PLUGINS_ROOT}/node_modules"
NAME="tabby-sidebar-autohide"
TARGET="${NM}/${NAME}"
LEGACY="${NM}/sidebar-autohide"

npm run build --prefix "$ROOT"

mkdir -p "$NM"
# 清理旧软链/旧名目录
rm -rf "$TARGET" "$LEGACY"
mkdir -p "$TARGET/dist"
cp "$ROOT/package.json" "$TARGET/package.json"
cp "$ROOT/dist/index.js" "$TARGET/dist/index.js"
if [[ -f "$ROOT/dist/index.js.map" ]]; then
  cp "$ROOT/dist/index.js.map" "$TARGET/dist/index.js.map"
fi

python3 - <<'PY'
import json, os
pkg = os.path.expanduser("~/Library/Application Support/tabby/plugins/package.json")
data = {"dependencies": {}}
if os.path.exists(pkg):
    with open(pkg, encoding="utf-8") as f:
        data = json.load(f)
deps = data.setdefault("dependencies", {})
deps.pop("sidebar-autohide", None)
deps["tabby-sidebar-autohide"] = "file:node_modules/tabby-sidebar-autohide"
with open(pkg, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
    f.write("\n")
print("Updated", pkg)
print("deps:", deps)
PY

echo "Installed (copy): $TARGET"
ls -la "$TARGET" "$TARGET/dist"
if [[ -L "$TARGET" ]]; then
  echo "ERROR: still a symlink" >&2
  exit 1
fi
echo "Restart Tabby completely (Cmd+Q, then reopen)."
