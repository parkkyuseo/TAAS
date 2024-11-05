# app.py
from flask import Flask, jsonify, render_template, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import json
import os
from datetime import datetime

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

subfolder_path = 'application_data'  # Subfolder to store user data
os.makedirs(subfolder_path, exist_ok=True)

# Initial empty structure for application data
empty_application_data = {
    "status": "Not Started",  # Will be set to "Not Started", "Incomplete", or "Complete"
    "last_edited": "",
    "admitted_semester": "",
    "college_status": "",
    "gpa": None,
    "ufid": "",
    "country_of_origin": "",
    "test_scores": {
        "speak_toefl": "n/a"  # Options: n/a, Under 45 Speak / 23 Toefl IBT, 45-50 Speak / 23-27 Toefl IBT, 55-60 Speak / 28-30 Toefl IBT
    },
    "eap_status": {
        "eap_5836_status": "",  # Ph.D. only, may be empty if not applicable
        "eap_5837_status": ""   # Ph.D. only
    },
    "research_and_teaching_interests": "",
    "travel_plan": "n/a",
    "course_preferences": [
        # List of course preferences; max 5 courses
        # Example: {"course": "Algorithms", "preference_level": "Highly preferred"}
    ],
    "last_page": ""
}

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


def save_empty_application_data(user_id):
    filepath = os.path.join(subfolder_path, f"{user_id}_application.json")
    with open(filepath, "w") as file:
        json.dump(empty_application_data, file, indent=4)

def save_application_data(user_id, data):
    formatted_data = empty_application_data.copy()
    formatted_data.update(data)
    print(formatted_data)
    filepath = os.path.join(subfolder_path, f"{user_id}_application.json")
    with open(filepath, 'w') as file:
        json.dump(formatted_data, file, indent=4)

def load_application_data(user_id):
    filepath = os.path.join(subfolder_path, f"{user_id}_application.json")
    try:
        with open(filepath, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return empty_application_data  # Return empty data if the file doesn't exist

# Handle application data
@app.route('/application', methods=['GET', 'POST'])
def application():
    if request.method == 'GET':
        # Retrieve user_id from query parameters for GET requests
        user_id = request.args.get("user_id")
        print("Received user_id in GET request in application GET:", user_id)  

        if not user_id:
            return jsonify({"error": "User ID is missing"}), 400  # Return 400 if user_id is not provided

        data = load_application_data(user_id)
        return jsonify(data), 200

    elif request.method == 'POST':
        # Retrieve user_id and application_data from JSON body for POST requests
        user_id = request.json.get("user_id")
        print("Received user_id in POST request in application POST:", user_id)

        if not user_id:
            return jsonify({"error": "User ID is missing"}), 400

        new_data = request.json.get("application_data")
        if not new_data:
            return jsonify({"error": "Application data is missing"}), 400

        # Load existing data
        existing_data = load_application_data(user_id)

        # Merge new data with existing data
        merged_data = {**existing_data, **new_data}

        # Update the status and last edited date
        merged_data["status"] = "Incomplete"
        formatted_date = datetime.now().strftime("%b. %d, %Y").replace(" 0", " ")
        merged_data["last_edited"] = formatted_date

        # Save the merged data
        save_application_data(user_id, merged_data)
        return jsonify({"message": "Application data saved successfully"}), 200
    

    # Handle final application submission
@app.route('/application_submit', methods=['POST'])
def application_submit():
    # Retrieve user_id and final application data from JSON body
    user_id = request.json.get("user_id")
    print("Received user_id in submission:", user_id)

    if not user_id:
        return jsonify({"error": "User ID is missing"}), 400

    # Retrieve application data from the submission request
    submission_data = request.json.get("application_data")
    if not submission_data:
        return jsonify({"error": "Application data is missing"}), 400

    # Load any existing data
    existing_data = load_application_data(user_id)

    # Merge submission data with existing data
    final_data = {**existing_data, **submission_data}

    # Set the status to "Complete" and update the last edited date
    final_data["status"] = "Complete"
    formatted_date = datetime.now().strftime("%b. %d, %Y").replace(" 0", " ")
    final_data["last_edited"] = formatted_date

    # Save the final application data
    save_application_data(user_id, final_data)
    return jsonify({"message": "Application submitted successfully"}), 200



if __name__=="__main__":
    app.run(debug=True)
    # If want to specify the host, etc. directly
    # app.run(host="127.0.0.1", port="5000", debug=True)
