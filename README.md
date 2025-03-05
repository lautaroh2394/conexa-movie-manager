# conexa-movie-manager

Desarrollo de Lautaro Haase

### Enunciado
https://conexatech.notion.site/Backend-Nest-Ssr-Test-E2E-d3fa3d4c614249b2afeac5d8cf98784f

Nota sobre update desde la swapi: Está disponible tanto como endpoint como cron. El cron se implementó con `@nestjs/schedule` y se ejecuta cada 12hs.

### Como levantar localmente

```
docker-compose up -d
npm install
npm run migration:run
npm run start
```

Las migraciones generan los siguientes usuarios:

```
username: 'admin'
password: '1234'
roles: [Role.ADMIN]
```

```
username: 'regularuser'
password: '1234'
roles: [Role.REGULAR_USER]
```

```
username: 'master'
password: '1234'
roles: [Role.REGULAR_USER, Role.REGULAR_USER]
```
(`master`tiene permiso para todas las acciones)

Para poder usar los endpoints:
- Hacer login con alguna de las credenciales indicadas (**/POST /auth/login**)
- Usar el access_token de la respuesta para authorizar
  - En swagger es con el botón de autorizar. Ingresar el token recibido
  - En insomnia/postman/curl/etc es agregando el header **Authorization** con el mismo valor ("Bearer _access_token_")


### Deployment:
Deployeé este proyecto en una raspberry pi y usé ngrok como reverse proxy, deberían poder acceder desde este endpoint: [link](https://5975-2800-810-488-d4e-2d06-5234-45b9-bc5a.ngrok-free.app/api)

