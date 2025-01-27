# **Node.js CI/CD Pipeline with AWS ECS Deployment**

## **Overview**

#### This repository demonstrates a comprehensive CI/CD pipeline for a Node.js application. The project showcases automated testing, containerization, and deployment using GitHub Actions and AWS ECS (Elastic Container Service). It includes multi-environment setups (staging and production) with manual approval for production deployments.


## **Features**

### CI/CD Pipeline: Fully automated pipeline with GitHub Actions.

### Dockerized Application: The Node.js app is containerized with Docker.

### AWS ECS Deployment: Automated deployment to ECS clusters for both staging and production.

### Manual Approval: GitHub Environments require manual approval for production deployment.

### Infrastructure as Code: Task definitions and ECS configurations are version-controlled.


## **Table of Contents**

### 1. Technologies Used

### 2. Architecture

### 3. Getting Started

    - Prerequisites

    - Setup Guide

### 4. CI/CD Workflow

### 5. AWS ECS Setup

### 6. Project Structure

### 7. Contributing

### 8. License


## **Technologies Used**

 - **Node.js:** Backend framework.

 - **Docker:** Containerization.

 - **GitHub Actions:** CI/CD automation.

 - **AWS ECS:** Cloud-based container orchestration.

 - **Jest:** Testing framework.

 - **AWS CLI:** Command-line interface for AWS operations.

## **Architecture**

#### 1. **Development Workflow:**

#### - Code is committed to the `main` branch.

#### - GitHub Actions runs automated tests and builds a Docker image.

#### 2. **Staging Deployment:**

#### - The Docker image is deployed to a staging ECS cluster.

#### **Production Deployment:**

#### - After manual approval, the Docker image is deployed to a production ECS cluster.

## **Getting Started**

### **Prerequisites**

#### 1. AWS Account: Ensure access to ECS, IAM, and related services.

#### 2. GitHub Repository: Store project code and workflows.

#### 3. Docker Installed: Install Docker on your local machine.

#### 4. Node.js Installed: Use version 20 or 23.

#### 5. GitHub Actions Secrets:

#### - AWS_ACCESS_KEY_ID: IAM user access key.

#### - AWS_SECRET_ACCESS_KEY: IAM user secret key.

#### - AWS_REGION: Deployment region (e.g., us-east-2).

#### - DOCKER_USERNAME: Docker Hub username.

#### - DOCKER_PASSWORD: Docker Hub password.

## **Setup Guide**

#### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/nodejs-cicd-pipeline.git
cd nodejs-cicd-pipeline
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Test the Application Locally
```bash
npm test
npm start
```
#### Visit `http://localhost:3000` to verify the application is running.

## **CI/CD Workflow**

### **GitHub Actions Workflow**

#### File: `.github/workflows/deploy.yml`

#### Workflow Steps:

#### 1. Checkout Code: Pulls the latest code from the repository.

#### 2. Set Up Node.js: Installs Node.js version 23.

#### 3. Install Dependencies: Runs npm install.

#### 4. Run Tests: Executes tests using Jest.

#### 5. Build Docker Image: Builds the Docker image for the app.

#### 6. Push to Docker Hub: Pushes the image with latest and commit SHA tags.

#### 7. Deploy to Staging: Updates the ECS service in the staging cluster.

#### 8. Manual Approval: Requires approval before deploying to production.

#### 9. Deploy to Production: Updates the ECS service in the production cluster.

## **AWS ECS Setup**

### ECS Cluster

#### 1. Create ECS Cluster:

``aws ecs create-cluster --cluster-name cicd-fargate-cluster``

### Task Definition

#### File: `task-definition.json`
```json
{
  "family": "nodejs-cicd-task",
  "networkMode": "awsvpc",
  "executionRoleArn": "arn:aws:iam::975050057999:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "nodejs-cicd-container",
      "image": "ultracloud5652/nodejs-cicd-app:latest",
      "cpu": 256,
      "memory": 512,
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "environment": [
        {
          "name": "PORT",
          "value": "3000"
        },
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/nodejs-cicd-app",
          "awslogs-region": "us-east-2",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000 || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 10
      }
    }
  ],
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512"
}
```

### **ECS Service**

#### Create Service:
```bash
aws ecs create-service \
  --cluster cicd-fargate-cluster \
  --service-name nodejs-cicd-service \
  --task-definition nodejs-cicd-task:1 \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-XXXXXX],securityGroups=[sg-XXXXXX],assignPublicIp=ENABLED}"
```

## **Project Structure**

```bash
nodejs-cicd-pipeline/
├── app/
│   ├── controllers/
│   │   └── homeController.js
│   ├── routes/
│   │   └── index.js
│   ├── tests/
│       ├── app.test.js
│       └── task.test.js
├── coverage/                # Test coverage reports
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD pipeline
├── Dockerfile               # Docker configuration
├── task-definition.json     # ECS Task Definition
├── package.json
├── package-lock.json
└── index.js                 # Entry point
```

## **For Contribution**

#### 1. Fork this repository.

#### 2. Create a branch: `git checkout -b feature-name`.

#### 3. Commit changes: `git commit -m 'Add new feature'`.

#### 4. Push the branch: `git push origin feature-name`.

#### 5. Open a pull request.

## **License**

#### This project is licensed under the MIT License. See the LICENSE file for details.

---

#### Feel free to clone, experiment, and extend this project. Contributions are always welcome!

