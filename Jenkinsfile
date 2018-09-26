pipeline {
  agent any

  tools {nodejs "node"}

  stages {
    stage('Test') {
      steps {
        echo 'Test'
        powershell 'ls watsonwebapp'
      }
    }
    stage('Merge') {
      steps {
        echo 'Merge'
      }
    }
  }
}
