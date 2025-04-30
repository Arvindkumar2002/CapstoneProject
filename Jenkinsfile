pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'client'
        BACKEND_DIR = 'server'
    }

    stages {
        stage('Clone Repo') {
            steps {
                // Clone the repository from GitHub
                git 'https://github.com/yourusername/mern-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies for the backend (server)
                dir("${env.BACKEND_DIR}") {
                    sh 'npm install'
                }
                // Install dependencies for the frontend (client)
                dir("${env.FRONTEND_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Build Backend') {
            steps {
                // Build the backend (server)
                dir("${env.BACKEND_DIR}") {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                // Build the frontend (client)
                dir("${env.FRONTEND_DIR}") {
                    sh 'npm run build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Run backend tests
                dir("${env.BACKEND_DIR}") {
                    sh 'npm test'
                }
                // Run frontend tests
                dir("${env.FRONTEND_DIR}") {
                    sh 'npm test'
                }
            }
        }

        stage('Dockerize') {
            steps {
                script {
                    // Build Docker images for backend and frontend
                    sh 'docker build -t yourdockerhubusername/mern-backend:latest ./server'
                    sh 'docker build -t yourdockerhubusername/mern-frontend:latest ./client'
                }
            }
        }
        
        stage('Push Docker Images') {
            steps {
                script {
                    // Push the Docker images to Docker Hub
                    sh 'docker push yourdockerhubusername/mern-backend:latest'
                    sh 'docker push yourdockerhubusername/mern-frontend:latest'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy your app (e.g., to AWS, Heroku, etc.)'
            }
        }
    }
}
