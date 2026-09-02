# DevOps Monitoring Dashboard

A self-built monitoring system tracking CPU usage and application logs, 
using Prometheus for metrics collection and Grafana for visualization. 
CI/CD automated via GitHub Actions, deployed on Render.

## Tech Stack
- Backend: Node.js (Express)
- Monitoring: Prometheus, Grafana
- CI/CD: GitHub Actions
- Deployment: Render
- Containerization: Docker, Docker Compose

## Features
- Real-time CPU usage monitoring
- Centralized log tracking
- Automated deployment pipeline on push to main
- Dashboards for visualizing system metrics

## How to Run Locally
\`\`\`bash
git clone https://github.com/cart-nlipp/devops-monitoring-dashboard
cd devops-monitoring-dashboard
docker-compose up
\`\`\`

## What I Learned
Learned how to configure Prometheus scrape targets, set up CI/CD triggers 
on push, and containerize a multi-service application using Docker Compose.