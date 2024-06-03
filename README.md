# Vehicle Info Update

Welcome to the Vehicle Info Update project, a full-stack web application developed with modern technologies:

- JavaScript
- MYSQL
- Node.js
- Express.js

[![My Skills](https://skillicons.dev/icons?i=js,nodejs,express,mysql)](https://skillicons.dev)

Access the application [here](https://vehicle-update-fullstack.onrender.com).

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v20.13.x or later)
- npm (v10.5.x or later)
- MySQL

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

3. Create a `.env` file in the `vehicle-update-fullstack` directory and add your MySQL secrets and other environment variables:

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

5. Open your browser and navigate to `http://localhost:8000`

### Database Setup

1. Create the database by sending a request to: `http://localhost:8000/create-db`

2. Create the database table by sending a request to: `http://localhost:8000/create-vehicles-table`

### Data File Format

To test file uploads, ensure your file is in `JSON` format with the following structure:

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
// Add more records as needed
]
```
