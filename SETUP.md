## 🚀 How to Run This Project

Follow the steps below to set up and run the Connect-It project on your local machine.

### 📦 Prerequisites

- Node.js and npm installed  
- MySQL installed and running

---

### ⚙️ Step 1: Set Up the Database

1. Open your MySQL client (e.g., MySQL Workbench or CLI).
2. Make sure a database named `connect_it` exists. If not, create it manually:
```sql
CREATE DATABASE connect_it;
```
3. Once the database is created, run the SQL script init.sql located in the db folder:
```sql
USE connect_it;
--Then run the contents of init.sql
```

4. After that, run the change.sql script in the same way to update or insert necessary data.

These scripts will create and populate the required database.

---

### 🛠️ Step 2: Configure Environment Variables
#### 📌 Backend (.env)

Create a `.env` file in the root directory and add the following:

```env
# Database configuration
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=connect_it

# Server configuration
PORT_SERVER=3002
```

⚠️ Replace your_password with your actual MySQL password.

#### 📌 Frontend (.env)

Create a .env file inside the client folder and add the following:

```env
# Client and Server Ports
REACT_APP_PORT_CLIENT=3000
REACT_APP_PORT_SERVER=3002

# URLs
REACT_APP_CLIENT_URL=http://localhost:3000
REACT_APP_SERVER_URL=http://localhost:3002
REACT_APP_IMAGE_URL=http://localhost:3002/uploads

# API Keys
REACT_APP_API_KEY_GOOGLE_BOOKS=your_google_books_api_key
REACT_APP_API_KEY_TMDB=your_tmdb_api_key
REACT_KEY_TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
REACT_APP_TINYMCE_KEY=your_tinymce_key
```
⚠️ Replace each your_... value with your actual API key or token.



### 🔧 Step 3: Start the Backend
1.	Navigate to the server folder:
```bash
cd server
```
2.	Install backend dependencies:
```bash
npm install
```
3. Start the backend server
```bash
node app.js
```
The backend will run at:
http://localhost:3002

### 💻 Step 4: Start the Frontend
1. Open a new terminal window and go to the client folder:
```bash
cd client
```
2. Install frontend dependencies:
```bash
npm install
```
3. Start the React development server:
```bash
npm start
```
The app will open in your browser at:
http://localhost:3000

