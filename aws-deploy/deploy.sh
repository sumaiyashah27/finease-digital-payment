#!/bin/bash
set -e

AWS_REGION="us-east-1"
AWS_ACCOUNT_ID="YOUR_AWS_ACCOUNT_ID"
ECR_REPO="finease-backend"
EB_APP="finease-app"
EB_ENV="finease-env"

echo "🔹 Logging into AWS ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

echo "🔹 Building Docker image..."
docker build -t $ECR_REPO ./server

echo "🔹 Tagging image..."
docker tag $ECR_REPO:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:latest

echo "🔹 Pushing image to ECR..."
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:latest

echo "🔹 Deploying to Elastic Beanstalk..."
cd aws-deploy
eb init -p docker $EB_APP --region $AWS_REGION || true
eb use $EB_ENV || eb create $EB_ENV
eb deploy

echo "✅ FinEase successfully deployed to AWS Elastic Beanstalk!"
