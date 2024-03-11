<div align="center">

<h3>
 Ticket system - API 🎫
</h3>

![Prisma Badge](https://img.shields.io/badge/prisma-090a15?logo=prisma)
![Express Badge](https://img.shields.io/badge/express-000?logo=express)
![GitHub issues](https://img.shields.io/github/issues/ngarcia-dev/test-prisma-orm)
![GitHub forks](https://img.shields.io/github/forks/ngarcia-dev/test-prisma-orm)
![GitHub PRs](https://img.shields.io/github/issues-pr/ngarcia-dev/test-prisma-orm)

</div>

## 🛠️ Stack

- [**PrismaORM**](https://www.prisma.io/) - intuitive data model, automated migrations, type-safety, and auto-completion.
- [**Express**](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
<!-- - [**React**](https://react.dev/) - The library for web and native user interfaces.-->

## 🧞 Commands

> [!IMPORTANT]
> Before executing the `prisma:dev` command you must create the database with the name defined in the .env file

|     | Command        | Action                                                    |
| :-- | :------------- | :-------------------------------------------------------- |
| $   | `dev`          | Starts local dev server at `localhost:3000`.              |
| $   | `generate:env` | Generates the **.env** file with the database connection. |
| $   | `prisma:dev`   | Build the database schema.                                |

## ⚙️ API Reference

#### Post Register User

```http
  POST /api/register
```

| Parameter  | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
| `email`    | `string` | **Required**. The user's name.           |
| `username` | `string` | **Required**. The user's e-mail address. |
| `password` | `string` | **Required**. The user's password.       |

### Example:

**Headers**:

- `Content-Type: application/json`

**Body** (raw JSON):

```json
{
  "name": "jdoe",
  "email": "ejemplo@correo.com",
  "pasword": "password"
}
```

#### Get all tickets

```http
  GET /api/tickets
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/tickets/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |
