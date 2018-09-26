pipeline {
  agent any

  tools {nodejs "node"}

  stages {
    stage('Test') {
      steps {
        echo 'Test'
        dir ('watsonwebapp') {
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
