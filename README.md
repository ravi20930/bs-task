````markdown
# Bitespeed Web Service

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run the following command to install dependencies:

```bash
yarn install
```
````

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:

```
EXPRESS_PORT=3009

NODE_ENV=prod
DB_SYNC_FLAG=true

# Database dev
DB_CONNECTION=postgres
DB_HOST=your_database_host
DB_PORT=5432
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

Replace `your_database_host`, `your_database_name`, `your_database_username`, and `your_database_password` with your actual database connection details.

## Build

To build the project, run the following command:

```bash
yarn build
```

This command compiles TypeScript files into JavaScript files in the `dist` directory.

## Start

To start the server, run the following command:

```bash
yarn start
```

This command starts the Express server using the compiled JavaScript files in the `dist` directory.

```

```
