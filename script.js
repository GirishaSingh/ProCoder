document.addEventListener("DOMContentLoaded", function() {
    var editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        lineNumbers: true,  
        mode: 'javascript', 
        theme: 'material'  
    });
});
