pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        echo 'Test'
        node watsonwebapp/spec/specRunner.js
      }
    }
    stage('Merge') {
      steps {
        echo 'Merge'
      }
    }
  }
}
