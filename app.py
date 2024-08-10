from flask import Flask, request, jsonify, send_from_directory
import subprocess
import os

app = Flask(__name__)

# Directory to store temporary files
TEMP_DIR = "temp"

# Ensure the temporary directory exists
if not os.path.exists(TEMP_DIR):
    os.makedirs(TEMP_DIR)

@app.route('/')
def index():
    return send_from_directory('', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('', filename)

@app.route('/run', methods=['POST'])
def run_code():
    code = request.json.get('code')
    if not code:
        return jsonify({'error': 'No code provided'}), 400

    # Save code to a temporary file
    filename = os.path.join(TEMP_DIR, 'Main.java')
    with open(filename, 'w') as f:
        f.write(code)

    # Compile and run the Java code
    compile_command = f"javac {filename}"
    run_command = "java -cp temp Main"

    try:
        compile_process = subprocess.run(compile_command, shell=True, capture_output=True, text=True)
        if compile_process.returncode != 0:
            return jsonify({'error': compile_process.stderr}), 400

        run_process = subprocess.run(run_command, shell=True, capture_output=True, text=True)
        return jsonify({'output': run_process.stdout, 'errors': run_process.stderr}), 200
    finally:
        # Clean up temporary files
        os.remove(filename)
        class_file = os.path.join(TEMP_DIR, 'Main.class')
        if os.path.exists(class_file):
            os.remove(class_file)

if __name__ == '__main__':
    app.run(debug=True)
