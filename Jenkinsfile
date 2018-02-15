pipeline {
	agent any
	stages {
	    stage ('Clone') {
		    steps {
		    	checkout scm
		    }
	    }
		stage('Build') {
			steps {
				sh "./build-docker.sh ${env.BRANCH_NAME}-latest"
			}
		}
	}
}
