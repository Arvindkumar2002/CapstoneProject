pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'GitHub-Credentials-Token', url: 'https://github.com/Arvindkumar2002/CapstoneProject.git'
            }
        }
    }
}
