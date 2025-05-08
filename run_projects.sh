#!/bin/bash

# Navigate to project directory
cd "/home/powamare/Desktop/Design Project/SWAVE-DesignProject" || exit

# Run npm build
npm run build

# Start the Python API in the background
nohup python3 api/main.py > api.log 2>&1 &

# Launch Firefox in kiosk mode
firefox --kiosk http://localhost:5000/machineui
