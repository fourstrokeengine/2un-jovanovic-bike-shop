#!/bin/bash

echo "════════════════════════════════════════════════"
echo "  2UN Jovanovic Bike Shop - Local Server"
echo "════════════════════════════════════════════════"
echo ""
echo "Starting web server on http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "════════════════════════════════════════════════"
echo ""

python3 -m http.server 8000
