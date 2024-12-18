# app.py
from flask import Flask, jsonify, render_template, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import json
import os
import glob
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
    {"id": "student", "password": "student-thisismypassword", "name": "Lisa"},
    {"id": "student2", "password": "student-thisismypassword", "name": "Bob"},
    {"id": "manager", "password": "manager-thisismypassword", "name": "Manager"},
    {"id": "professor", "password": "professor-thisismypassword", "name": "Professor1 Name"},
    {"id": "professor2", "password": "professor-thisismypassword", "name": "Professor2 Name"}
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

    # Manager authentication
    if user_id == "manager" and password == "manager-thisismypassword":  
        access_token = create_access_token(identity={"user_id": user_id, "role": "manager"})
        return jsonify({"access_token": access_token, "role": "manager"}), 200

    # Authenticate the user (students)
    user = next((user for user in users_data if user["id"] == user_id and user["password"] == password), None)

    if user:
        # Generate a JWT token
        access_token = create_access_token(identity={"user_id": user_id, "role": "student"})
        return jsonify({"access_token": access_token, "role": "student"}), 200

    # Invalid credentials
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
        
        user = next((u for u in users_data if u["id"] == user_id), {})
        new_data["name"] = user.get("name", "Unknown")  # Add the name field

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


@app.route('/courses', methods=['GET'])
def get_courses():
    try:
        # Load courses from the JSON file
        with open('data/courses.json', 'r') as file:
            courses = json.load(file)
        return jsonify(courses), 200
    except FileNotFoundError:
        return jsonify({"error": "Courses data not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# @app.route('/manager/students', methods=['GET', 'POST'])
# def manage_students():
#     if request.method == 'GET':
#         # Fetch all students' application data
#         student_files = glob.glob('application_data/*_application.json')
#         students_data = [json.load(open(f)) for f in student_files]
#         return jsonify(students_data), 200

#     elif request.method == 'POST':
#         # Update a student's application data
#         student_id = request.json.get("student_id")
#         updated_data = request.json.get("application_data")
#         save_application_data(student_id, updated_data)
#         return jsonify({"message": "Student data updated successfully"}), 200
    
@app.route('/manager/students', methods=['GET', 'POST'])
def manage_students():
    if request.method == 'GET':
        # Fetch all students' application data
        student_files = glob.glob('application_data/*_application.json')
        students_data = []

        for file in student_files:
            with open(file) as f:
                student_data = json.load(f)
                student_id = student_data.get("ufid")  # Assuming UFID matches user ID
                students_data.append(student_data)

        return jsonify(students_data), 200

    elif request.method == 'POST':
        # Update a student's application data
        student_id = request.json.get("student_id")
        updated_data = request.json.get("application_data")
        save_application_data(student_id, updated_data)
        return jsonify({"message": "Student data updated successfully"}), 200


@app.route('/manager/courses', methods=['GET', 'POST', 'DELETE'])
def manage_courses():
    if request.method == 'GET':
        # Fetch all courses
        with open('data/courses.json', 'r') as file:
            courses = json.load(file)
        return jsonify(courses), 200

    elif request.method == 'POST':
        # Add or update a course
        new_course = request.json
        with open('data/courses.json', 'r') as file:
            courses = json.load(file)
        courses.append(new_course)
        with open('data/courses.json', 'w') as file:
            json.dump(courses, file)
        return jsonify({"message": "Course updated successfully"}), 200

    elif request.method == 'DELETE':
        # Delete a course
        course_code = request.json.get("course_code")
        with open('data/courses.json', 'r') as file:
            courses = json.load(file)
        courses = [course for course in courses if course["code"] != course_code]
        with open('data/courses.json', 'w') as file:
            json.dump(courses, file)
        return jsonify({"message": "Course deleted successfully"}), 200


@app.route('/professors', methods=['GET', 'POST'])
def manage_professors():
    try:
        if request.method == 'GET':
            with open('data/professors.json', 'r') as file:
                professors = json.load(file)
            return jsonify(professors), 200

        elif request.method == 'POST':
            # Updating professor information
            updated_data = request.json.get("professors")
            with open('data/professors.json', 'w') as file:
                json.dump(updated_data, file, indent=2)
            return jsonify({"message": "Professors updated successfully"}), 200
    except FileNotFoundError:
        return jsonify({"error": "Professors data not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/manager/dashboard', methods=['GET'])
@jwt_required()
def manager_dashboard():
    """
    Manager dashboard route, accessible only by managers.
    """
    current_user = get_jwt_identity()
    if current_user["role"] != "manager":
        return jsonify({"error": "Unauthorized"}), 403
    
    return jsonify({"message": "Welcome to the manager dashboard!"}), 200


if __name__=="__main__":
    app.run(debug=True)
    # If want to specify the host, etc. directly
    # app.run(host="127.0.0.1", port="5000", debug=True)
