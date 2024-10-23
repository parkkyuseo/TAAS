# app.py
from flask import Flask, jsonify, render_template, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

# Create an instance of the Flask object
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# Configure the secret key for JWT
app.config['JWT_SECRET_KEY'] = 'super-secret-key'  # Change this to a more secure key
jwt = JWTManager(app)  # Initialize the JWTManager

@app.route('/',methods=('GET', 'POST'))# The URL being accessed
def index():
    if request.method == "POST":
        user = request.form.get('user')
        print(f"User submitted: {user}")
        data = {'level': 60, 'point': 360, 'exp': 45000}
        return f"Hello, {user}!"
    elif request.method == "GET":
        user = "HelloUser"
        data = {'level': 60, 'point': 360, 'exp': 45000}

    return render_template('index.html', user=user,data=data)

# Example data: List of users
users_data = [
    {"id": "student", "password": "student-thisismypassword"},
    {"id": "student2", "password": "student-thisismypassword"}
]

@app.route('/users', methods=['GET'])
def get_users():
    """
    Endpoint to return the list of users in JSON format.
    """
    return jsonify({"users": users_data})  # Use jsonify for a proper JSON response

@app.route('/login', methods=['POST'])
def login():
    """
    Authenticate user and return a JWT token if successful.
    """

    print("PRINTHERE")


    user_id = request.json.get("id")
    password = request.json.get("password")

    # Print the incoming data to verify what's being sent from the frontend
    print(f"Incoming login data: ID={user_id}, Password={password}")

    # Authenticate the user
    user = next((user for user in users_data if user["id"] == user_id and user["password"] == password), None)

    if user:
        # Generate a JWT token
        access_token = create_access_token(identity=user_id)
        return jsonify({"access_token": access_token}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401


# A protected route that requires a valid JWT token
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    """
    Example of a protected route that requires JWT authentication.
    """
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__=="__main__":
    app.run(debug=True)
    # If want to specify the host, etc. directly
    # app.run(host="127.0.0.1", port="5000", debug=True)
