///-----------------Code for the editor-----------------///

window.onload = function(){
    displayLines();
    updateMarkdown();
}

//displaying the line numbers
function displayLines(){
    const textarea = document.getElementById('editor-text');
    const lineNums = document.getElementById('editor-lines');
    const lines = textarea.value.split('\n');
    lineNums.innerHTML = Array.from({
        length : lines.length,
    }, (_,i) => `<div>${i + 1}</div>`).join('');

    const textareaStyle = window.getComputedStyle(textarea);
    [
        'font-family',
        'font-size',
        'font-weight',
        'letter-spacing',
        'line-height',
        'padding',
    ].forEach((property) => {
        lineNums.style[property] = textareaStyle[property];
    });
}
displayLines();

function updateMarkdown(){
    const md = window.markdownit();
    var content = document.getElementById('editor-text').value;
    var result = md.render(content);
    document.getElementById('markdown').innerHTML = result;
    displayLines();
}
updateMarkdown();

function downloadMarkdown(){
    text = document.getElementById('editor-text').value;
    filename = 'markdown.md';
    let download = document.createElement('a');
    download.setAttribute('href', 
        'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    download.setAttribute('download', filename);
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
}

function copyMarkdown(){
    var copyText = document.getElementById('editor-text');
    copyText.select();
    copyText.setSelectionRange(0, 99999); //this is for mobile devices
    navigator.clipboard.writeText(copyText.value); //document.execCommand('copy');
    alert('Text copied to clipboard');
}

function copyHTML(){
    //get the html using the markdown parser
    const md = window.markdownit();
    const content = document.getElementById('editor-text').value;
    var result = md.render(content);
    navigator.clipboard.writeText(result); //document.execCommand('copy');
    alert('HTML copied to clipboard');
}

function downloadHTML(){
    //get the html using the markdown parser
    const md = window.markdownit();
    const content = document.getElementById('editor-text').value;
    var text = md.render(content);
    var filename = 'markdown.html';
    
    let download = document.createElement('a');
    download.setAttribute('href', 
        'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    download.setAttribute('download', filename);
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
}