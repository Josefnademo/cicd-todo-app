#!/bin/bash

# ==== SYSTEM UPDATE ====
sudo apt update && sudo apt upgrade -y

# ==== INSTALL DOCKER ====
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose

# Enable Docker
sudo systemctl enable docker
sudo systemctl start docker

# Add current user to docker group
sudo usermod -aG docker $USER

# ==== INSTALL NODE.JS 20 ====
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# ==== PRINT VERSIONS ====
docker --version
docker-compose --version
node -v
npm -v
echo "Installation completed successfully."
