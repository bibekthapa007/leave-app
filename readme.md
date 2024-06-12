### Leave Management System

#### Introduction

The Leave Management System is designed to streamline and automate the process of managing employee leave requests within an organization. The system facilitates efficient handling of leave applications, approvals, and tracking, while also providing comprehensive reporting capabilities.

#### Setup Prerequisite

- Nodejs
- Yarn
- Docker

#### File Structure

```
leave/
├─ client/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ constants/
│  │  ├─ hooks/
│  │  ├─ pages/
│  │  ├─ stores/
│  │  ├─ types/
│  ├─ Dockerfile
│  ├─ tsconfig.json
│  ├─ package.json
├─ server/
│  ├─ src/
│  │  ├─ constants/
│  │  ├─ database/
│  │  ├─ services/
│  │  ├─ types/
│  │  ├─ index.ts
│  │  ├─ knexFile.ts
│  ├─ package.json
│  ├─ Dockerfile
├─ .gitignore
├─ package.json

```

#### Getting Started

##### 1. Clone the Repository

```
git clone https://github.com/bibekthapa007/leave-app.git
cd leave-app
```

##### 2. Install Dependencies

```
cd server
yarn install
cd ../client
yarn install
```

##### 3. Set Up Environment Variables

Create a .env file in the server directory and copy the content from .env.example to .env. Modify the following environment variables as needed:

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
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=<DB_NAME>
DB_USER=<DB_USER>
DB_PASSWORD=<DB_PASSWORD>
```

Update the .env file with your MySQL configuration:

For the client, create a .env file in the client directory and copy the content from .env.example to .env. Modify the following environment variables as needed:

```
REACT_APP_ENV='local'
REACT_APP_NAME='Leave APP'

REACT_APP_BASE_PATH='/'
REACT_APP_API_BASE_URI=http://localhost:5555/api
```

##### 4. Run Database Migrations

```
cd server
yarn migrate
```

##### 5. Seed the Database

```
yarn seed
```

##### 6. Start the Application

Start the server:

```
cd ./server
yarn start:dev
```

Start the client:

```
cd ./client
yarn start
```

The server will be running at http://localhost:5555, and the client will be running at http://localhost:3000 (or as specified in your client configuration).
