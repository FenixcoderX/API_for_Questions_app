# API for Questions app

TypeScript | MongoDB | Node.js | Express | Dotenv | JWT | Bcrypt | Cookie | CORS | SSE |

A RESTful API has been developed to support a "Questions" app. 

- **Authentication:** The API handles the registration and authentication process using JSON Web Tokens (JWT).
- **Endpoints and Models:** It provides required endpoints and models for users and questions.
- **CRUD Operations:** It contains handlers for all necessary CRUD operations using the MongoDB database.
- **Security:** Specific endpoints are secured to prevent unauthorized access.
- **Real-Time Updates:** Server-Sent Events (SSE) are used to update data in real time.

## Instructions

### 1. **ENV**

In repo, you will see a `.env-example` file. Rename the file to `.env`. 

To work with the database, you will need to register on the MongoDB website and create a new database. 

After creating the database, copy its connection string and paste it into the `.env` file, assigning it to the `MONGO` variable.

```env
MONGO=your_mongodb_connection_string
```

### 2. **Install the dependencies**

```bash
  yarn install
```

### 3. **Database setup**
If you want to populate the database with initial data, you can run the `setInitialData` script.

```bash
  yarn setInitialData
```

### 4. **Now you can start the API**

```bash
  yarn watch
```

- watch: to start the server
