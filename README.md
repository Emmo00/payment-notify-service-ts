# payment-notify-service-ts

> My attempt to convert [payment-notify-service](https://github.com/Emmo00/payment-notify-service) to a Typescript project.

This service notifies you by email whenever you have a successful payment made to your `FLUTTERWAVE` account.

## Tech Stack

- Node.js
- Express.js
- Nodemailer, Sendinblue

## Endpoints

```txt
GET /api/status - Status Ping
POST /api/webhook-callback - Webhook Callback
```

## Environment Variables

```txt
NODE_ENV=
PORT=
CORS_ORIGIN=

SENDINBLUE_API_KEY=
EMAIL_FROM=
EMAIL_TO=

FLW_PUBLIC_KEY=
FLW_SECRET_KEY=
FLW_SECRET_HASH=
```

## Get it started

Clone Repo.

```bash
git clone <repo url>
```

Install deps.

```bash
npm install
```

create a file called `.env` in the root of the project and fill in the environment variables

Create a file in to root of the directory called `db.json`, and add the following content to it, than save:

```json
{ "transactions": [] }
```

Start Project

```bash
npm run start
```
