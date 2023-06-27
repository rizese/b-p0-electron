#!/bin/bash

# Define the service filename
SERVICE_NAME=be-p0-mind.service

# Check if the service file exists in the current directory
if [ ! -f ./$SERVICE_NAME ]; then
    echo "Error: $SERVICE_NAME not found in the current directory."
    exit 1
fi

# Copy the service file to the correct location
sudo cp ./$SERVICE_NAME /etc/systemd/system/

# Set the correct permissions on the service file
sudo chmod 644 /etc/systemd/system/$SERVICE_NAME

# Reload systemd to recognize your new service
sudo systemctl daemon-reload

# Enable your service to start on boot
sudo systemctl enable $SERVICE_NAME

echo "Installation complete. The service will start automatically on boot."
echo "You can manually start the service now with: sudo systemctl start $SERVICE_NAME"
