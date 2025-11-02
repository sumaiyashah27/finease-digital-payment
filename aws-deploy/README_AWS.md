# 🚀 AWS Deployment Guide (FinEase)

This folder contains configuration files to deploy the **FinEase** app on **AWS Elastic Beanstalk** using Docker.

## Files

- **Dockerrun.aws.json** → Defines how Docker runs the backend container.
- **deploy.sh** → Script to build, push, and deploy the container to AWS.

## Steps

1. Create ECR Repository:
   ```bash
   aws ecr create-repository --repository-name finease-backend
