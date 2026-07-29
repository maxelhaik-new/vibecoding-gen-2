#!/usr/bin/env bash
# Daemon de surveillance pour le serveur d'assets local (Port 8080)
# Redémarre automatiquement le serveur si le port 8080 est libéré ou si le processus s'arrête.

PROJECT_DIR="/Users/maximeelhaik/Documents/VIBE CODING GENERATION"
cd "$PROJECT_DIR" || exit 1

while true; do
  if ! lsof -i :8080 > /dev/null 2>&1; then
    echo "[$(date)] Serveur non détecté sur le port 8080. Démarrage de serve_assets.py..." >> /tmp/serve_assets_daemon.log
    python3 "$PROJECT_DIR/scripts/serve_assets.py" >> /tmp/serve_assets.log 2>&1
  fi
  sleep 2
done
