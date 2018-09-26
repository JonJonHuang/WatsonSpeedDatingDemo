pipeline {
  agent any

  tools {nodejs "node"}

  stages {
    stage('Test') {
      steps {
        echo 'Test'
        powershell 'cd watsonwebapp'
      }
    }
    stage('Merge') {
      steps {
        echo 'Merge'
      }
    }
  }
}
