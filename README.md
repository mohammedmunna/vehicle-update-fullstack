# Vehicle Info Update

This project is a full-stack web application built using the following tools:

- JavaScript
- MYSQL
- Node.js
- Express.js

[![My Skills](https://skillicons.dev/icons?i=js,nodejs,express,mysql)](https://skillicons.dev)

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v20.13.x or later)
- npm (v10.5.x or later)
- MYSQL

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/vehicle-update-fullstack.git
   cd vehicle-update-fullstack
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `vehicle-update-fullstack` directory and add your MYSQL secrets and other environment variables:

   ```
   DB_NAME=nameofyourdatabase
   MYSQL_HOST=mysqlhost
   MYSQL_PORT=mysqlport
   MYSQL_USER=username
   MYSQL_PASSWORD=password
   APPLICATION_URL=http://localhost:8000
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:8000`

### Database Setup

1. The aplication allows you to create a database by API request: `http://localhost:8000/create-db`

2. Create database table using API request: `http://localhost:8000/create-vehicles-table`

### Data of file

For testing the file upload, the file has to be `JSON` format, with the following file contents:

```bash
  [{
   "model_year": "2013",
   "make": "Mercedes-Benz",
   "model": "CLS",
   "rejection_percentage": "0,0",
   "reason_1": "reason #1 why",
   "reason_2": "reason #2 why",
   "reason_3": "reason #3 why"
 },
 {
   "model_year": "2013",
   "make": "Nissan",
   "model": "JUKE",
   "rejection_percentage": "0,0",
   "reason_1": "reason #1 why",
   "reason_2": "reason #2 why",
   "reason_3": ""
 },
 ...]
```
