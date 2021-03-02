## Login and Register

| Method | Endpoint         | Request Body             | Returns                       |
| ------ | ---------------- | ------------------------ | ----------------------------- |
| POST   | `/auth/register` | `{ username, password }` | `{ user_id, username,token }` |
| POST   | `/auth/login`    | `{ username, password }` | `{ token,message }`           |

## Potlucks (with Auth)

| Method | Endpoint               | Request Body                    | Returns                                                           |
| ------ | ---------------------- | ------------------------------- | ----------------------------------------------------------------- |
| POST   | `/potlucks`            | `{ location, timestamp, name }` | `{ user_id, potluck_id, timestamp, location }`                    |
| GET    | `/potlucks`            | -                               | `[{ potluck_id, name }]`                                          |
| GET    | `/potlucks/:id`        | -                               | `{ location, timestamp, potluck_id, user_id, [guests], [items] }` |
| PUT    | `/potlucks/:id`        | `{ location, timestamp, name }` | `{ location, timestamp, potluck_id, user_id, [guests], [items] }` |
| POST   | `/potlucks/:id/guest`  | `{ newguest_id }`               | `[{ guests }]`                                                    |
| POST   | `/potlucks/:id/item`   | `{ item_name }`                 | `[{ items }]`                                                     |
| PUT    | `/potlucks/:id/item`   | `{ item_id, guest_id }`         | `{ item }`                                                        |
| POST   | `/potlucks/:id/accept` | -                               | `{ location, timestamp, potluck_id, user_id, [guests], [items] }` |

## User

| Method | Endpoint         | Request Body                    | Returns                                        |
| ------ | ---------------- | ------------------------------- | ---------------------------------------------- |
| POST   | `users/potlucks` | `{ location, timestamp, name }` | `{ user_id, potluck_id, timestamp, location }` |
| GET    | `users/potlucks` | -                               | `[{ potluck_id, name }]`                       |
