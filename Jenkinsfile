pipeline {
  agent any

  tools {nodejs "node"}

  stages {
    stage('Build') {
      steps {
        echo 'Build'
        dir('watsonwebapp') {
          powershell 'npm install'
        }
      }
    }
    stage('Test') {
      steps {
        echo 'Test'
        dir('watsonwebapp') {
          powershell 'npm run test'
        }
      }
    }
    stage('Merge') {
      steps {
        echo 'Merge'
      }
    }
  }
}
