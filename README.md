## Login and Register

| Method | Endpoint         | Request Body             | Returns                       |
| ------ | ---------------- | ------------------------ | ----------------------------- |
| POST   | `/auth/register` | `{ username, password }` | `{ user_id, username,token }` |
| POST   | `/auth/login`    | `{ username, password }` | `{ token,message }`           |

## Potlucks (with Auth)

| Method | Endpoint               | Request Body                    | Returns                                                                 |
| ------ | ---------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| GET    | `/potlucks`            | -                               | `{ location, timestamp, potluck_id, user_id, name }`                    |
| GET    | `/potlucks/:id`        | -                               | `{ location, timestamp, potluck_id, user_id, name, [guests], [items] }` |
| PUT    | `/potlucks/:id`        | `{ location, timestamp, name }` | `{ location, timestamp, potluck_id, user_id, name, [guests], [items] }` |
| POST   | `/potlucks/:id/guest`  | `{ user_id }`                   | `[{ guests }]`                                                          |
| DELETE | `/potlucks/:id/guest`  | `{ user_id }`                   | `[{ guests }]`                                                          |
| GET    | `/potlucks/:id/item`   | -                               | `[{ items }]`                                                           |
| POST   | `/potlucks/:id/item`   | `{ item_name }`                 | `[{ items }]`                                                           |
| PUT    | `/potlucks/:id/item`   | `{ item_id }`                   | `{ updated item }`                                                      |
| DELETE    | `/potlucks/:id/item`   | `{ item_id }`                   | `[{  items }]`                                                      |
| PUT    | `/potlucks/:id/accept` | -                               | `{ location, timestamp, potluck_id, user_id, [guests], [items] }`       |

## User

| Method | Endpoint          | Request Body                    | Returns                                        |
| ------ | ----------------- | ------------------------------- | ---------------------------------------------- |
| POST   | `/users/potlucks` | `{ location, timestamp, name }` | `{ user_id, potluck_id, timestamp, location }` |
| GET    | `/users/potlucks` | -                               | `[{ potluck_id, name }]`                       |
