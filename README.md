# Bienvenido al coding-interview-backend-level-3 - Parte I

## Descripción

Este proyecto es una API REST que permite realizar operaciones CRUD sobre una entidad de tipo `Item`.

La entidad tiene 3 campos: `id`, `name` y `price`.

Tu tarea es completar la implementación de toda la funcionalidad de forma tal de que los tests e2e pasen exitosamente.

### Que puedes hacer:

- ✅ Modificar el código fuente y agregar nuevas clases, métodos, campos, etc.
- ✅ Cambiar dependencias, agregar nuevas, etc.
- ✅ Modificar la estructura del proyecto (/src/\*\* es todo tuyo)
- ✅ Elegir una base de datos
- ✅ Elegir un framework web
- ✅ Crear otros tests
- ✅ Cambiar la definición del .devContainer

### Que **no** puedes hacer:

- ❌ No puedes modificar el archivo original /e2e/index.test.ts (pero puedes crear otros test si lo deseas)
- ❌ El proyecto debe usar Typescript
- ❌ Estresarte 🤗

## Pasos para comenzar

1. Haz un fork usando este repositorio como template
2. Clona el repositorio en tu máquina
3. Realiza los cambios necesarios para que los tests pasen
4. Sube tus cambios a tu repositorio
5. Avísanos que has terminado
6. ???
7. PROFIT

### Cualquier duda contactarme a https://www.linkedin.com/in/andreujuan/

## Set Up

- install node 20 or higher.
- install mongodb.`brew install mongodb-community@7.0` on mac, before install mongodb check if you got the last version of xcode installed on mac.
- install mongodb compass to visualize mongodb databases and collections. (optional, could use mongo querys by terminal)

## Running the app local

- By default the app is configured to use port 9000 to init, if you want to init using other port, you need to add on env variables the SERVER_PORT var with the value. ex: `SERVER_PORT=3000`

## Running the app

```bash
# local
$ npm run start:local
```

## Running the app with VSCode Debug Mode

```bash
GO to Run/Debug and Start debugging using the launch.json file
```

## Running the app local with Docker

1. Prerequisite: Docker and Docker compose installed (Docker Desktop bundle is enough).
2. Run `./docker-up.sh` on root.

## Swagger API Doc's on

```bash
http://localhost:9000/api-docs/
```

## Run my own tests

```bash
$ npm run test
```
