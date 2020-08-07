#!/bin/bash
# Author: Cristian Contrera

DOCKER_NAME="frontend-dev"
DOCKER_PROD_NAME="frontend-prod"

if [ "$1" == 'prod' ];
then
  echo "Start server on production mode"

  exist_docker=$(docker | grep DOCKER_PROD_NAME | wc -l)
  if [ $(( $exist_docker )) == 0 ];
  then
    echo "Docker image not found. Building from file.."
    docker build -t $DOCKER_PROD_NAME -f Dockerfile_prod .
  fi

  echo "Image ready, starting container.."

  docker run --rm -d --name=frontend -it -p 80:3000 -v $PWD/.:. $DOCKER_PROD_NAME
  exit 0;
fi

exist_docker=$(docker images | grep $DOCKER_NAME | wc -l)
if [ $(( $exist_docker )) == 0 ];
then
  echo "Docker image not found. Building from file.."
  docker build -t $DOCKER_NAME .
fi

echo "Image ready, starting container.."
docker run --rm -d --name=frontend -it -p 80:3000 -v $PWD/.:/app/ $DOCKER_NAME


