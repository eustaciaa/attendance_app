# Express Node.js Backend Server

This is a simple Express Node.js backend server application with a single API endpoint to download employee monthly attendance in XLS format.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Setup

1. Create a `.env` file in the root directory of your project and add the following environment variables:

    ```env
    DATABASE_PORT=5432
    DATABASE_USERNAME=postgres
    DATABASE_NAME=postgres
    DATABASE_PASSWORD=superuser
    DATABASE_HOST=localhost

    SERVER_PORT=3000
    SERVER_HOST=localhost
    ```

2. Start the server:
   ```bash
   npm start
   ```

3. For development with auto-restarting, use nodemon:
   ```bash
   npm run dev
   ```

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

- `DATABASE_PORT`: Port number for the database connection.
- `DATABASE_USERNAME`: Username for the database connection.
- `DATABASE_NAME`: Name of the database.
- `DATABASE_PASSWORD`: Password for the database user.
- `DATABASE_HOST`: Hostname or IP address of the database server.
- `SERVER_PORT`: Port number on which the server will run.
- `SERVER_HOST`: Hostname or IP address of the server.

## API Endpoints

### Download Employee Monthly Attendance

**Endpoint:** `/download/xls/employeeMonthlyAttendance`

**Method:** `GET`

**Query Parameters:**
- `nik` (string): Employee NIK (e.g., `1116000`)
- `bulan` (integer): Month (e.g., `1` for January)
- `tahun` (integer): Year (e.g., `2024`)

**Example Request:**
```http
GET /download/xls/employeeMonthlyAttendance?nik=1116000&bulan=1&tahun=2024
```

---

Additionally, ensure your `package.json` has the following scripts:

```json
{
  "scripts": {
    "dev": "nodemon --watch src/**/* --exec ts-node src/index.ts --delay 5",
    "start": "tsc && node src/index.ts",
  }
}
```
