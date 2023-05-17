FROM composer:2 as build

WORKDIR /app

COPY . .

RUN composer install

FROM php:8-fpm

WORKDIR /app

COPY --from=build /app .

RUN docker-php-ext-install pdo pdo_mysql

EXPOSE 8000

CMD [ "php", "artisan", "serve", "--host=0.0.0.0", "--port=8000" ]
