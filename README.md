# SpankinFresh Farm Market Blog

## Project setup
```
npm install
```

### Configure Security Settings

1. Open __src > shared > config.js__
2. Replace "enter-value-here" with values from your Okta developer console:

```
// The Issuer URI from your Okta API Authorization Servers:
export const OAUTH_ISSUER = 'enter-value-here';
// From your Okta applications list, or on the "General" tab of a specific application:
export const CLIENT_ID = 'enter-value-here';
```

### Compiles and hot-reloads for development
```
npm run serve
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
