pipeline {
  agent any

  tools {nodejs "node"}

  stages {
    stage('Test') {
      steps {
        echo 'Test'
        dir ('watsonwebapp') {
          powershell 'ls'
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
