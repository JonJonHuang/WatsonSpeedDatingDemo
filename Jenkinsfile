pipeline {
  agent any

  tools {nodejs "node"}

  stages {
    stage('Test') {
      steps {
        echo 'Test'
        sh 'npm config ls'
      }
    }
    stage('Merge') {
      steps {
        echo 'Merge'
      }
    }
  }
}
