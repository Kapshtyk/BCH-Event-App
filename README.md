# Symfony-MAMP

Symfony-MAMP is a set of docker images that include Starter-Kit for a MAMP stack ([Symfony6](https://symfony.com/), [macOS](https://www.apple.com/macos/monterey/), [Apache](https://www.apache.org/), [MySQL](https://www.mysql.com/), [PHP8](https://www.php.net/) and [phpMyAdmin](https://www.phpmyadmin.net/)) all in one handy package.

---

## Using the image

## Installation

```shell
git clone Symfony-MAMP
cd Symfony-MAMP
cp .env.example .env && cp web/.env.example web/.env
docker-compose up --build
```

- Symfony 6 will run on [http://localhost:8007](http://localhost:8007)
- phpMyAdmin will run on [http://localhost:9082](http://localhost:9082)

### Optional: Apple M1 Chip
You may have to Uncomment line 4, remove # from [docker-compose.yml](https://github.com/kalwar/Symfony-MAMP/blob/main/docker-compose.yml#L4)  file

# Use for reference

Use solely for reference material only
