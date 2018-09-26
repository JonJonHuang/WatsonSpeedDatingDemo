pipeline {
  agent any

  tools {nodejs "node"}

  stages {
    stage('Test') {
      steps {
        echo 'Test'
        bat 'cd watsonwebapp'
        bat 'npm run test'
      }
    }
    stage('Merge') {
      steps {
        echo 'Merge'
      }
    }
  }
}
