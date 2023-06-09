## Helsinki Business College Event App

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

### Application Setup Instructions

To set up the application, please follow the steps below:

1. Clone the repository and change to the project directory:
```
git clone https://github.com/Kapshtak/summer-project.git
cd summer-project
```

2. Create a `.env` file in the project root directory and add the following database configuration:
```
DATABASE_NAME=eventsdb
DATABASE_USERNAME=root
DATABASE_PASSWORD=lionPass
```

3. Change the directory to the `web` folder:
```
cd web
```

4. Create another `.env` file in the `web` directory and add the following configuration:
```
APP_ENV=dev
APP_SECRET=da9a2f60ac8d562ddb37596018a5192f
DATABASE_URL="mysql://root:lionPass@db:3306/eventsdb?serverVersion=8"
CORS_ALLOW_ORIGIN='^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$'
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=4668b05f7d5c885ead6ec7ec05bbc22c2faf5e8bfae007fcb9e51188487f3be8
```

5. Change the directory back to the project root and build the Docker containers:
```
cd ..
docker-compose build
```

6. Once the containers are built, start them using Docker Compose:
```
docker-compose up
```

7. Change the directory to the `summer-frontend` folder:
```
cd summer-frontend
```

8. Start the frontend application:
```
npm start
```
Following these steps will set up the application and start both the backend and frontend components. You can access the application by opening your web browser and navigating to `http://localhost:3000`. The admin panel will be allowed at `http://localhost:8007`.
