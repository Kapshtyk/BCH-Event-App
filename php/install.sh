#!/usr/bin/env bash

cd web

echo -e "\033[0;32m[1/2] composer install"
composer install

# echo -e "\033[0;32m[2/2] Create database"
# symfony console doctrine:database:drop --force
# symfony console doctrine:database:create
# symfony console doctrine:migrations:migrate
# symfony console doctrine:fixtures:load --no-interaction

echo -e "\033[1;37m___________________________________________________"
echo -e ""
echo -e "Symfony-MAMP is ready !"
echo -e ""
echo -e "\033[0;32mSymfony 6 runs on " http://localhost:8007
echo -e "\033[0;32mphpMyAdmin runs on " http://localhost:9082
echo -e ""
echo -e "\033[1;37m___________________________________________________"

apache2-foreground > /dev/null 2>&1