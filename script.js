// document.addEventListener("DOMContentLoaded", function() {
    
//     var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
//         mode: "text/x-java",
//         lineNumbers: true,
//         theme: "material-darker",
//         indentUnit: 4,
//         smartIndent: true,
//         autoCloseBrackets: true,
//         matchBrackets: true
//     });

//     function runCode() {
//         const code = editor.getValue();
//         const userInput = document.getElementById('input').value;  // Get user input from the input area
        
//         fetch('/run', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ code: code, input: userInput })  // Include user input in the request
//         })
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById("output").value = data.output || data.error;  // Display output or error in the output area
//             document.getElementById("time-complexity").innerText = 'Time Complexity: ' + data.time_complexity;
//             document.getElementById("space-complexity").innerText = 'Space Complexity: ' + data.space_complexity;
//         })
//         .catch(error => {
//             document.getElementById("output").value = 'Error: ' + error.message;
//         });
//     }
//     document.querySelector(".btn.run").addEventListener("click", runCode);
//     document.querySelector(".btn.fullscreen").addEventListener("click", () => {
//         if (document.documentElement.requestFullscreen) {
//             document.documentElement.requestFullscreen();
//         }
//     });
//     document.querySelector(".btn.share").addEventListener("click", () => {
//         const code = editor.getValue();
//         navigator.clipboard.writeText(code).then(() => {
//             alert("Code copied to clipboard!");
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", function() {
    var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
        mode: "text/x-java",
        lineNumbers: true,
        theme: "material-darker",
        indentUnit: 4,
        smartIndent: true,
        autoCloseBrackets: true,
        matchBrackets: true
    });

    function runCode() {
        const code = editor.getValue();
        const userInput = document.getElementById('input').value;  // Get user input from the input area

        fetch('/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code, input: userInput })  // Include user input in the request
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("output").innerText = data.output || data.error;  // Display output or error in the output area
            document.getElementById("time-complexity").innerText = 'Time Complexity: ' + data.time_complexity;
            document.getElementById("space-complexity").innerText = 'Space Complexity: ' + data.space_complexity;
        })
        .catch(error => {
            document.getElementById("output").innerText = 'Error: ' + error.message;
        });
    }

    document.querySelector(".btn.run").addEventListener("click", runCode);

    document.querySelector(".btn.fullscreen").addEventListener("click", () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
    });

    document.querySelector(".btn.share").addEventListener("click", () => {
        const code = editor.getValue();
        navigator.clipboard.writeText(code).then(() => {
            alert("Code copied to clipboard!");
        });
    });

    // Toggle practice menu visibility
    document.getElementById('practice-button').addEventListener('click', function() {
        const practiceMenu = document.getElementById('practice-menu');
        if (practiceMenu.style.display === 'none' || practiceMenu.style.display === '') {
            practiceMenu.style.display = 'block';
        } else {
            practiceMenu.style.display = 'none';
        }
    });
});

