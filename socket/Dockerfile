FROM php:8.2

RUN apt-get update \
    && apt-get install -y zip unzip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

COPY composer.json composer.lock ./

COPY . .

COPY install.sh ./install.sh
RUN chmod +x ./install.sh

ENTRYPOINT ["/app/install.sh"]

CMD php -S 0.0.0.0:8080 -t public/