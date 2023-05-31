# API endpoints:
## Events
### Get endpoints:
- http://localhost:8007/api/v1/events - retrieves the collection of Events resources.
- http://localhost:8007/api/v1/events/{id} - retrives a single Event.
  - request headers:
    ```
    Accept: application/json
    ```
  - response example: 
    ```
    [
      {
        "id": 0,
        "title": "string",
        "description": "string",
        "eventDate": "2023-05-31T08:26:37.027Z",
        "location": "string",
        "comments": [
          {
            "author": {
              "email": "user@example.com"
            },
            "text": "string",
            "createdAt": "2023-05-31T08:26:37.027Z",
            "isPublished": true
          }
        ],
        "isPublished": true
      }
    ]
    ```
### Other methods:
Only GET method will be allowed via API, all CRUD operations are allowed in the admin panel, including changing the ```isPublished``` field. 
Frontend should hide events where ```isPublished == false``` and display past events in a separate component.

### Permissions:
The API resource should be available to any user.

## Comments
All after-mention CRUD operations are also allowed in the admin panel

### Get endpoints:
- http://localhost:8007/api/v1/comments - retrieves the collection of Comments resources.
- http://localhost:8007/api/v1/comments/{id} - retrieves a single Comment.

### Post endpoint:
- http://localhost:8007/api/v1/comments - create a new Comment.
  - request body:
  ```
  {
    "event": "string <iri-reference>",
    "author": "string <iri-reference>",
    "text": "string"
  }
  ```
iri-reference is a URL to the resource, for example ```api/events/1```.

  As the comment is connected to the event frontend, the event iri-reference should be taken from the props, and the author iri-reference from the current user __[TBD how to implement current user]__.

### Patch endpoint:
- http://localhost:8007/api/v1/comments/{id} - updates the Comment.
  - request headers:
    ```
    Content-Type: application/merge-patch+json
    ```

  - request body:
    ```
    {
      "text": "new text",
      "isPublished": false
    }
    ```

### Delete endpoint:
- http://localhost:8007/api/v1/comments/{id} - deletes the Comment.

### Permissions:
The add comment function should only be available to authorised users. If the user's role is Staff or Administrator __[TBD how to implement frontend roles]__, the user should have a "Hide Comment" button available in the comments component. Users should be able to edit and delete their own comments.

On backend API resouse for GET requests must be available to any user, for POST requests to authorized users, for PATCH and DELETE requests to author and staff.

## Polls questions
### Get endpoints:
- http://localhost:8007/api/v1/polls_questions - retrieves the collection of Poll question resources.
- http://localhost:8007/api/v1/polls_questions/{id} - retrives a single Poll question.
  - request headers:
    ```
    Accept: application/json
    ```
  - response example: 
    ```
    [
      {
        "id": 0,
        "question": "string",
        "createdAt": "2023-05-31T08:48:53.366Z",
        "pollsChoices": [
          {
            "id": 0,
            "choice": "string",
            "votes": 0
          }
        ],
        "isPublished": true
      }
    ]
    ```
### Patch endpoint:
- http://localhost:8007/api/v1/polls_questions/{id} - updates the Poll question.
  - request headers:
    ```
    Content-Type: application/merge-patch+json
    ```

  - request body:
    ```
    {
      "question": "string",
      "isPublished": true
    }
    ```

### Permissions:
If the user's role is Staff or Administrator __[TBD how to implement frontend roles]__, the user should have a "Hide poll" and "Edit question" button available in the polling component.

On the backend API, the resource for GET requests must be available to any user, for PATCH requests to staff.

## Polls choices
### Get endpoints:
- http://localhost:8007/api/v1/polls_choices - retrieves the collection of Poll choices resources.
- http://localhost:8007/api/v1/polls_choices/{id} - retrives a single Poll choice.
  - request headers:
    ```
    Accept: application/json
    ```
  - response example: 
    ```
    [
      {
        "id": 0,
        "choice": "string",
        "votes": 0,
        "question": "string <iri-reference>"
      }
    ]
    ```

    The choices should be filtered on the front-end side - we need to extract choices related to the particular question.

### Patch endpoint:
- http://localhost:8007/api/v1/polls_choices/{id} - updates the Poll choice.
  - request headers:
    ```
    Content-Type: application/merge-patch+json
    ```

  - request body:
    ```
    {
      "choice": "string",
    }
    ```

### Permissions:
If the user's role is Staff or Administrator __[TBD how to implement frontend roles]__, the user should have a "Edit choice" button available in the polling component.

On the backend API, the resource for GET requests must be available to any user, for PATCH requests to staff.

## Polls votes
### Post endpoint:
- http://localhost:8007/api/v1/polls_votes - create a new Poll vote.
  - request body:
  ```
  {
    "question": "string <iri-reference>",
    "choice": "string <iri-reference>",
    "author": "string  <iri-reference>"
  }
  ```

  As the votes are linked to the question and choices, the question and choice iri-references should be taken from the props, and the author iri-reference from the current user __[TBD how to implement current user]__.

### Other methods:
Only POST method will be allowed via API, all CRUD operations are allowed in the admin panel.

### Permissions:
The API resource should be available to authorised users.

## Users
### Get endpoints:
- http://localhost:8007/api/v1/users - retrieves the collection of Users resources.
- http://localhost:8007/api/v1/users/{id} - retrives a single User.
  - request headers:
    ```
    Accept: application/json
    ```
  - response example: 
    ```
    [
      {
        "id": 0,
        "email": "user@example.com",
        "roles": [
          "string"
        ],
        "comments": [
          {
            "text": "string",
            "createdAt": "2023-05-31T12:36:41.203Z",
            "isPublished": true
          }
        ]
      }
    ]
    ```
### Post endpoint:
- http://localhost:8007/api/v1/users - create a new User.
  - request body:
    ```
      {
        "email": "user@example.com",
        "password": "string",
      }
    ```
### Other methods:
The API resource should be available to authorised users, only GET and POST methods are allowed via API, all CRUD operations are allowed in the admin panel. When a new user is created via API, their role will be ROLE_USER, other roles can be set in the admin panel (ROLE_STAFF etc).

### Permissions:
The API resource should be available to any user.
