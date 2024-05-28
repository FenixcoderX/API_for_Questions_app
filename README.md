# API for Questions app

TypeScript | MongoDB | Node.js | Express | Dotenv | Jsonwebtoken | Bcrypt | Cookie | CORS

A RESTful API has been developed to support Questions app. Contains a MongoDB models and handlers. It includes authentication, required endpoints, and data types for users, questions.


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
