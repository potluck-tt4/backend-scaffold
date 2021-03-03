## Login and Register

| Method | Endpoint         | Request Body             | Returns                       |
| ------ | ---------------- | ------------------------ | ----------------------------- |
| POST   | `/auth/register` | `{ username, password }` | `{ user_id, username,token }` |
| POST   | `/auth/login`    | `{ username, password }` | `{ token,message }`           |

### Token is required for all endpoints listed below

## Potlucks

| Method | Endpoint        | Request Body                    | Returns                                                                 |
| ------ | --------------- | ------------------------------- | ----------------------------------------------------------------------- |
| GET    | `/potlucks`     | -                               | `{ location, timestamp, potluck_id, user_id, name }`                    |
| GET    | `/potlucks/:id` | -                               | `{ location, timestamp, potluck_id, user_id, name, [guests], [items] }` |
| PUT    | `/potlucks/:id` | `{ location, timestamp, name }` | `{ location, timestamp, potluck_id, user_id, name, [guests], [items] }` |
| DELETE | `/potlucks/:id` | -                               | -                                                                       |

## User

| Method | Endpoint             | Request Body                    | Returns                                        |
| ------ | -------------------- | ------------------------------- | ---------------------------------------------- |
| GET    | `/users`             | -                               | `[{ user }]`                                   |
| GET    | `/users/potlucks`    | -                               | `[{ potluck_id, name }]`                       |
| GET    | `/users/invitations` | -                               | `[{ potluck_id }]`                             |
| POST   | `/users/potlucks`    | `{ location, timestamp, name }` | `{ user_id, potluck_id, timestamp, location }` |

## Item

| Method | Endpoint         | Request Body                | Returns            |
| ------ | ---------------- | --------------------------- | ------------------ |
| GET    | `/item`          | `{ potluck_id }`            | `[{ items }]`      |
| POST   | `/item`          | `{ potluck_id, item_name }` | `[{ items }]`      |
| PUT    | `/item`          | `{ item_id, user_id }`      | `{ updated item }` |
| DELETE | `/item/:item_id` | -                           | -                  |

## Guest

| Method | Endpoint            | Request Body              | Returns           |
| ------ | ------------------- | ------------------------- | ----------------- |
| GET    | `/guests`           | `{ potluck_id }`          | `[{ guests }]`    |
| POST   | `/guests`           | `{ potluck_id, user_id }` | `{ added_guest }` |
| DELETE | `/guests/:guest_id` | -                         | -                 |
| PUT    | `/guests/accept`    | `{ potluck_id }`          | `{ potluck_id }`  |
