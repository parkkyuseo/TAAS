
# TA Application System

This is a **TA Application System** built using **Flask** (backend) and **React** (frontend). It features a basic login system with **JWT authentication** and sets up a framework for future development, such as adding a TA application form.

## Requirements
- **Python** (Version 3.8 or later)
- **Node.js** (for React frontend)
- **npm**

## Technologies Used
- **Flask**: Python web framework (backend)
- **React**: JavaScript library for building user interfaces (frontend)
- **JWT (JSON Web Token)**: For authentication
- **CORS**: For cross-origin communication between frontend and backend

---

## Installation Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/ta-application-system.git
cd ta-application-system
```

### 2. Set Up the Backend (Flask)
Make sure you're in the project root directory where `app.py` is located.

1. **Create a virtual environment** (optional, but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

### 3. Set Up the Frontend (React)
Move to the `client` directory (or wherever your React frontend is located):

```bash
cd client
```

1. **Install React dependencies**:
   ```bash
   npm install
   ```

---

## Running the Project

### 1. Start the Backend (Flask)
Make sure you're in the project root directory (where `app.py` is located) and the virtual environment is activated (if you’re using one).

Run the Flask server:
```bash
python app.py
```

The Flask server will start on `http://127.0.0.1:5000/`.

### 2. Start the Frontend (React)
Navigate to the `client` folder and start the React frontend:

```bash
npm start
```

The React app will start on `http://127.0.0.1:3000/`.

---

## What Has Been Implemented

### 1. **Backend (Flask)**
- A basic **Flask server** is set up with the following routes:
  - **`/login`**: A POST route for user login, which verifies user credentials and generates a **JWT token** upon successful authentication.
  - **`/protected`**: A protected route that requires a valid JWT token to access.
  
- **JWT Authentication**: Users can log in using their credentials and receive a JWT token for subsequent requests to access protected routes.

### 2. **Frontend (React)**
- A simple **login form** that takes **ID** and **password** from the user.
- The form sends a POST request to the `/login` endpoint in Flask to authenticate the user.
- Upon successful login, a JWT token is received and can be used for making authenticated requests (e.g., accessing the `/protected` route).
- Basic routing is implemented using **React Router** for navigating between different pages (e.g., the welcome page and login page).

---

## Next Steps
- Implement the **TA Application Form** for logged-in users to submit their applications.

---

## Common Commands
- **Install dependencies**: `pip install -r requirements.txt` (backend) and `npm install` (frontend).
- **Run Flask server**: `python app.py`.
- **Run React server**: `npm start`.
