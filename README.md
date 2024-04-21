````markdown
# BiteSpeed Web Service

## Installation

To install the dependencies, run:

```bash
yarn install
```
````

## Build

To build the project, run:

```bash
yarn build
```

## Start

To start the server, run:

```bash
yarn start
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```dotenv
EXPRESS_PORT=3009

NODE_ENV=prod
DB_SYNC_FLAG=true

# Database dev
DB_CONNECTION=postgres
DB_HOST=
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=
DB_PASSWORD=
```

## Endpoints

### `/new`

**Method:** POST

**Description:** Creates or updates contacts.

**Request Body:**

```json
{
  "email": "example@example.com",
  "phoneNumber": "1234567890"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "message": "successfully created/updated contacts"
}
```

### `/identify`

**Method:** POST

**Description:** Identifies a contact based on email or phone number.

**Request Body:**

```json
{
  "email": "example@example.com",
  "phoneNumber": "1234567890"
}
```

**Response:**

```json
{
  "primaryContactId": "383a66df-3795-4533-b4ac-5aca6d8446b3",
  "emails": ["ravi@example.com", "charu@example.com", "haha@example.com"],
  "phoneNumbers": ["9636565686"],
  "secondaryContactIds": [
    "bc74b571-6086-495c-92ef-5cecc1032d98",
    "b3db3751-8b6b-4fee-9f1e-6e14768fe456",
    "b6997684-0f1d-4665-8ae5-998a67785ac7"
  ]
}
```

```

```
