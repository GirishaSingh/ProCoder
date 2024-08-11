from flask import Flask, request, jsonify, send_from_directory
import subprocess
import os
import re

app = Flask(__name__)

TEMP_DIR = "temp"

if not os.path.exists(TEMP_DIR):
    os.makedirs(TEMP_DIR)

@app.route('/')
def index():
    return send_from_directory('', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('', filename)

def analyze_complexity(code):
    time_complexity = 'Unknown'
    space_complexity = 'Unknown'

    loop_pattern = re.compile(r'\b(for|while)\s*\(([^)]+)\)')
    loops = loop_pattern.findall(code)
    
    for loop in loops:
        condition = loop[1]

        if re.search(r'\b(i|j|k)\s*(<=|<|>=|>|==|!=)\s*\d+', condition):

            time_complexity = 'O(n)'  
        else:
            
            time_complexity = 'O(n)'
    
 
    if re.search(r'System\.out\.println', code):
        time_complexity = 'O(1)' if time_complexity == 'Unknown' else time_complexity
        space_complexity = 'O(1)'
    
    return {
        'time': time_complexity,
        'space': space_complexity
    }


@app.route('/run', methods=['POST'])
def run_code():
    code = request.json.get('code')
    user_input = request.json.get('input')
    if not code:
        return jsonify({'error': 'No code provided'}), 400

    filename = os.path.join(TEMP_DIR, 'Main.java')
    with open(filename, 'w') as f:
        f.write(code)

    compile_command = f"javac {filename}"
    run_command = "java -cp temp Main"

    try:
        compile_process = subprocess.run(compile_command, shell=True, capture_output=True, text=True)
        if compile_process.returncode != 0:
            return jsonify({'error': compile_process.stderr}), 400

        run_process = subprocess.run(run_command, shell=True, input=user_input, capture_output=True, text=True)
        complexity = analyze_complexity(code)
        return jsonify({
            'output': run_process.stdout,
            'errors': run_process.stderr,
            'time_complexity': complexity['time'],
            'space_complexity': complexity['space']
        }), 200
    finally:
        os.remove(filename)
        class_file = os.path.join(TEMP_DIR, 'Main.class')
        if os.path.exists(class_file):
            os.remove(class_file)

if __name__ == '__main__':
    app.run(debug=True)
