pipeline {
  agent any

  tools {nodejs "node"}

  stages {
    stage('Test') {
      steps {
        echo 'Test'
        powershell 'ls'
        powershell 'cd watsonwebapp'
        powershell 'ls'
        powershell 'cd watsonwebapp'
        powershell 'ls'
      }
    }
    stage('Merge') {
      steps {
        echo 'Merge'
      }
    }
  }
}
