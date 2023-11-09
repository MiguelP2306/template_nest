# ! /bin/bash
ENV_FILE=".dev.env"

load_env () {
  . $ENV_FILE
}

init () {
  echo "
  ================================================
    Creando archivo $ENV_FILE
    Llenar con los valores necesarios
  ================================================"

  cp -v .env.example $ENV_FILE
}

start () {
  load_env

  docker compose --env-file ./.env up -d
}

stop () {
  echo "
  ================================================
    Apagando docker
  ================================================"

  docker compose down
}

reset_containers () {
  docker-compose build --no-cache $1
  start
}

migrations_create () {
  npm run migrations:create api/src/database/migrations/$1
}

migrations_generate () {
  npm run migrations:generate api/src/database/migrations/$1
}

${@}
