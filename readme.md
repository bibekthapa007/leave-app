### Ticketing microservice

#### Setup Prerequisite

- Nodejs
- Yarn
- Docker
- Kubernetes

#### File Structure

```
project/
├── infra
├── auth
├── client/
│ |── style.css
└── skaffold.yaml
```

#### Start Application

Start the docker with kubernetes
Make sure ingress-ngnix is running

```
skaffold dev
```

Visit the `https://ticketing-local.dev/` and type `thisisunsafe`
