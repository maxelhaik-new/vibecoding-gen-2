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
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "OK")
        self.end_headers()

def main():
    handler = CORSRequestHandler
    # Pour s'assurer qu'on sert depuis la racine du projet
    import os
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    
    # Autoriser la réutilisation immédiate du port après arrêt
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("127.0.0.1", PORT), handler) as httpd:
        print(f"[Serveur] Démarré sur http://localhost:{PORT} (avec en-têtes CORS activés)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[Serveur] Arrêté.")

if __name__ == "__main__":
    main()
