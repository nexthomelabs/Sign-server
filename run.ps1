# Set environment variables
$env:HOST_URL = "http://localhost:3001"

# Copy environment files
Copy-Item .env.local_dev .env.prod

# Build the Docker images locally
Write-Host "Building Docker images locally..."
docker build -t nexthomelabs/sign:latest ./apps/OpenSign
docker build -t nexthomelabs/sign-server:latest ./apps/OpenSignServer

# Start the application with Docker Compose
docker compose up -d

Write-Host "Nexthomelabs Sign is now running!"
Write-Host "Access the application at: http://localhost:3001"