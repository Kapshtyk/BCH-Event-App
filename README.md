## Project Name

Helsinki Business College Event App

### Overview

This project is a summer project developed as part of a school project at Helsinki Business College. The objective of the project was to create an app that facilitates communication between the school and its visitors. The app allows the admin to add events, while users can view event details, register for events, leave comments, and access city events through an API provided by Helsinki City.

The frontend of the application is built using TypeScript and React, while the backend is developed using Symfony PHP framework. MySQL was used as the database management system through phpMyAdmin. The project involves the development of APIs for events, users, and comments, which are consumed by the React frontend.

Additionally, an admin panel is provided to enable the admin to manage events, users, and perform other administrative tasks.

### Features

- User Authentication: Users are required to log in to access the app's features.
- Event Management: Admin can add and manage events through the admin panel.
- Event Details: Users can view event details such as date, time, - and location.
- Event Registration: Users can register for events they are interested in.
- Comments: Users can leave comments on individual event pages.
- City Events: The app fetches open API data from Helsinki City to display city events.
- Admin Panel: An admin panel is available for the admin to manage events, users, and perform administrative tasks.

### Tech Used

- Frontend: TypeScript, React, CSS
- Backend: Symfony PHP framework
- Database: MySQL
- APIs: Events API, Users API, Comments API
- External APIs: Helsinki City API for city events
- Tools: phpMyAdmin for database management

### Project Structure

The project follows a client-server architecture, with the frontend and backend components separated. The frontend code can be found in the summer-frontend directory, while the backend code is located in the web directory.

### Symfony-MAMP

Symfony-MAMP is a set of docker images that include Starter-Kit for a MAMP stack ([Symfony6](https://symfony.com/), [macOS](https://www.apple.com/macos/monterey/), [Apache](https://www.apache.org/), [MySQL](https://www.mysql.com/), [PHP8](https://www.php.net/) and [phpMyAdmin](https://www.phpmyadmin.net/)) all in one handy package.

---

### Installation

```shell
git clone Symfony-MAMP
cd Symfony-MAMP
cp .env.example .env && cp web/.env.example web/.env
docker-compose up --build
```

- Symfony 6 will run on [http://localhost:8007](http://localhost:8007)
- phpMyAdmin will run on [http://localhost:9082](http://localhost:9082)

### Optional: Apple M1 Chip

You may have to Uncomment line 4, remove # from [docker-compose.yml](https://github.com/kalwar/Symfony-MAMP/blob/main/docker-compose.yml#L4) file

### Contributors

- [Alexsandr Bondarenko](https://github.com/AlexBondFi)
- [Arseniiy Kapshtak](https://github.com/Kapshtak)
- [Michael Akerele](https://github.com/stacknatic)
- [Sahil Thapa](https://github.com/sahilt2)

### Use for reference

Use solely for reference material only
