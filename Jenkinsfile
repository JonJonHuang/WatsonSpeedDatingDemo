pipeline {
  agent any

  tools {nodejs "node"}

  stages {
    stage('Test') {
      steps {
        echo 'Test'
        bat 'npm config ls'
      }
    }
    stage('Merge') {
      steps {
        echo 'Merge'
      }
    }
  }
}
