document.addEventListener("DOMContentLoaded", function() {
    // Initialize CodeMirror on the textarea with id 'code-editor'
    var editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        lineNumbers: true,  // Show line numbers
        mode: 'javascript', // Set the mode for syntax highlighting
        theme: 'material'   // Set the theme (you can change this to any other theme you like)
    });
});
