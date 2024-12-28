# ! /bin/bash
ENV_FILE=".env"
ENV_FILE_TEST=".env.test"
ENV_FILE_DEV=".env.dev"

load_env () {
  . $1
}

function upContainers {
  if docker ps --format '{{.Names}}' | grep -Eq "^$1$"; then
    echo "El contenedor $1 ya está levantado."
  else
    docker compose --env-file ./.env up -d $1
    sleep 3
    echo "El contenedor $1 ha sido levantado."
  fi
}

init () {
  echo "
  ================================================
    Creando archivo $ENV_FILE
    Llenar con los valores necesarios
  ================================================"

  cp -v .env.example $ENV_FILE
  cp -v .env.example .dev.env
  cp -v .env.example .test.env

  init_env_test
}

init_env_test () {
  echo -e "# La variable DB_PORT tiene que ser la misma que esta en el docker compose\nDB_PORT=3307" > .test.env
}

dev () {
  yarn migration:run:dev
  yarn start:dev
}

start () {
  load_env $ENV_FILE_DEV

  upContainers "mysql_nest"
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
  # start
}

migrations_create () {
  yarn migration:create ./src/database/migrations/$1
}

migrations_generate () {
  yarn migration:generate ./src/database/migrations/$1
}

migrations_run () {
  yarn migration:run:dev
}

generate_module () {
  nest g mo modules/$1  --no-spec
  nest g s modules/$1 --no-spec
  nest g co modules/$1 --no-spec
}

e2e () {
  load_env $ENV_FILE_TEST

  upContainers "mysql_nest"

  yarn migration:run:test

  yarn test:e2e
}

${@}
