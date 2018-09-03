**Set up Hool project**

## 1. set docker-compose.prod.yml.example environment variables 

    ...
    environment:
         - NODE_ENV=
         - DB_USERNAME=
         - DB_PASSWORD=
         - DB_NAME=
         - DB_HOSTNAME=
         - NODEMAILER_EMAIL=
         - NODEMAILER_PASSWORD=
         - NODEMAILER_SERVICE=
         - NODEMAILER_SENDER_EMAIL=
    ...

## 3. raname docker-compose.prod.yml.example to docker-compose.prod.yml

## 2. run docker
    
    docker-compose build
    docker-compose -f docker-compose.prod.yml up
