#!/usr/bin/env python3
import http.server
import socketserver

PORT = 8080
DIRECTORY = "."

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "OK")
        self.end_headers()

def main():
    handler = CORSRequestHandler
    import os
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    
    # Autoriser la réutilisation immédiate du port après arrêt
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("127.0.0.1", port), handler) as httpd:
        print(f"[Serveur] Démarré sur http://localhost:{port} (avec en-têtes CORS & No-Cache)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[Serveur] Arrêté.")

if __name__ == "__main__":
    main()
