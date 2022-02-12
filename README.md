# SpankinFresh Farm Market Blog

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Build for Kubernetes
```
vue-cli-service build --mode k8s
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Containerize for multiple architectures

* [Build multi-arch images with Buildx](https://docs.docker.com/desktop/multi-arch/#build-multi-arch-images-with-buildx)

### Create a builder

```
docker buildx create --name mybuilder
docker buildx use mybuilder
docker buildx inspect --bootstrap
```

### Build and push
```
vue-cli-service build --mode k8s
docker buildx build --push --platform linux/arm64,linux/amd64 --tag <user>/swe-vue-k8s:<tag> .
```