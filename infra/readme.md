## Deploying Your Application with Skaffold and Kubernetes

### Prerequisites

Before starting, ensure you have the following installed and set up:

**Kubernetes Cluster**: Set up a Kubernetes cluster where you will deploy your application.

**Skaffold**: Install Skaffold on your local machine. Skaffold handles the workflow for building, pushing, and deploying your application.

**kubectl**: Install kubectl, the Kubernetes command-line tool, to interact with your Kubernetes cluster.

**Ingress**: Setup Ingress to manage resources in Kubernetes.

### Getting Started

#### 1. Setup Environment

Clone the repository and navigate into it:

```
git clone https://github.com/bibekthapa007/leave-app.git
cd leave-app
```

#### 2. Redirect localhost to local-dev.com in local environment

For Windows
Navigate to the Hosts File: Go to C:\Windows\System32\drivers\etc and open the hosts file using any text editor as administrator.

Add Redirect Entry: Append 127.0.0.1 local-dev.com at the end of the file and save the
changes.

Configure the redirection based on your OS.

#### 3. Configure Environment Variables

Create environment variable files and modify as necessary:

Server .env Example:

```
# DEVELOPMENT

NODE_ENV=development

# APP

APP_NAME='Auth API'
APP_VERSION='1.0.0'
APP_PORT='5555'
APP_BASE_URL=/api/auth/

# SENTRY

SENTRY_DSN=''
SENTRY_ENVIRONMENT=''

# DATABASE

DB_CLIENT=mysql2
DB_HOST=leave-mysql-srv # Update with your MySQL service name
DB_PORT=3306
DB_NAME=<DB_NAME>
DB_USER=<DB_USER>
DB_PASSWORD=<DB_PASSWORD>
```

Client .env Example:

```
REACT_APP_ENV='local'
REACT_APP_NAME='Leave APP'

REACT_APP_BASE_PATH='/'
REACT_APP_API_BASE_URI=http://leave-server-srv:5555/api # Update with your server service name
```

#### 4. Deploy with Skaffold

Ensure Skaffold is properly configured (skaffold.yaml):

```
apiVersion: skaffold/v1beta15
kind: Config
deploy:
  kubectl:
    manifests:
      - ./infra/k8s/*
build:
  local:
    push: false
  artifacts:
    - image: bibekthapa123/leave-server
      context: server
      docker:
        dockerfile: Dockerfile
      sync:
        manual:
          - src: "src/**/*.ts"
            dest: .
    - image: bibekthapa123/leave-client
      context: client
      docker:
        dockerfile: Dockerfile
      sync:
        infer:
          - "**/*.ts"
          - "**/*.tsx"
          - "**/*.css"
```

#### Run Skaffold to deploy your application:

```
skaffold dev
```

#### 5. Configure Ingress

Create an Ingress resource (ingress.yaml):

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-service
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/use-regex: "true"
spec:
  rules:
    - host: leave-local.dev
      http:
        paths:
          - path: /api/auth/?(.*)
            pathType: Prefix
            backend:
              service:
                name: server-srv
                port:
                  number: 5555
          - path: /?(.*)
            pathType: Prefix
            backend:
              service:
                name: client-srv
                port:
                  number: 3000
```

#### Apply the Ingress configuration to your Kubernetes cluster:

```
kubectl apply -f ingress.yaml
```

#### 6. Running Database Migrations

After deploying your application, you'll need to run database migrations to set up your database schema. Follow these steps:

Access the Server Pod:
Open a shell session in the server pod where your application is deployed:

```
kubectl exec -it <server-pod-name> -- /bin/bash
```

Replace <server-pod-name> with your actual server pod name.

Run Migrations:

```
yarn migrate
```

Seed the Database (if necessary):
If your application requires seeding of initial data, you can run the seed command after migrations:

```
yarn seed
```

#### 7. Access Your Application

Server: Access your server at http://leave-local.dev/api/auth.
Client: Ensure your client configuration points to the server’s IP and port (http://leave-local.dev) and type thisisunsafe.

Summary
Deploy your application using Skaffold with Kubernetes, configure Ingress for path-based routing, and handle HTTPS redirection to https://leave-local.dev/. Adjust configurations as per your environment specifics (DB_HOST, DB_NAME, etc.) and apply them using `kubectl apply -f`` commands to activate them in your Kubernetes cluster.
