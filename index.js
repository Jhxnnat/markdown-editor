///-----------------Code for the editor-----------------///
//displaying the line numbers
function displayLines(index){
    const editors = document.querySelectorAll('.row');
    editors.forEach((editor) => {
        if (index !== undefined && index == editor.getAttribute('data-tab')) {
            const textarea = editor.querySelector('.editor-text');
            const lineNums = editor.querySelector('.editor-lines');
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
            return;
        }
    });
}

function updateMarkdown(index){
    const editors = document.querySelectorAll('.row');
    editors.forEach((editor) => {
        if (index !== undefined && index == editor.getAttribute('data-tab')) {
            const textarea = editor.querySelector('.editor-text');
            const markdown = editor.querySelector('.markdown-box');
            const content = textarea.value;
            const md = window.markdownit();
            const result = md.render(content);
            markdown.innerHTML = result;
            return;
        }
    });
}

function downloadMarkdown(){
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => {
        let active = tab.classList.contains('active');
        if (active){
            let index = tab.getAttribute('data-tab');
            const row = document.querySelector(".row[data-tab='"+index+"']");
            const textarea = row.querySelector('.editor-text');
            const content = textarea.value;
            let filename = `markdown${index}.md`;
            let download = document.createElement('a');
            download.setAttribute('href', 
                'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
            download.setAttribute('download', filename);
            document.body.appendChild(download);
            download.click();
            document.body.removeChild(download);
            return;
        }
    });
}

function downloadHTML(){
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => {
        let active = tab.classList.contains('active');
        if (active){
            let index = tab.getAttribute('data-tab');
            const row = document.querySelector(".row[data-tab='"+index+"']");
            const textarea = row.querySelector('.editor-text');
            //get the html using the markdown parser
            const md = window.markdownit();
            const content = textarea.value;
            var text = md.render(content);
            var filename = `markdown${index}.html`;
            
            let download = document.createElement('a');
            download.setAttribute('href', 
                'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            download.setAttribute('download', filename);
            document.body.appendChild(download);
            download.click();
            document.body.removeChild(download);
        }
    });
}

function copyMarkdown(){
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => {
        let active = tab.classList.contains('active');
        if (active){
            let index = tab.getAttribute('data-tab');
            const row = document.querySelector(".row[data-tab='"+index+"']");
            const textarea = row.querySelector('.editor-text');
            textarea.select();
            textarea.setSelectionRange(0, 99999); //this is for mobile devices
            navigator.clipboard.writeText(textarea.value); //document.execCommand('copy');
            alert('Text copied to clipboard');
        }
    });
}

function copyHTML(){
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => {
        let active = tab.classList.contains('active');
        if (active){
            let index = tab.getAttribute('data-tab');
            const row = document.querySelector(".row[data-tab='"+index+"']");
            const textarea = row.querySelector('.editor-text');
            //get the html using the markdown-it parser
            const md = window.markdownit();
            const content = textarea.value;
            var result = md.render(content);
            navigator.clipboard.writeText(result); //document.execCommand('copy');
            alert('HTML copied to clipboard');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    let tabCounter = 1;
  
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            document.querySelectorAll('.tab, .tab-content').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
  
    document.querySelectorAll('.close').forEach(close => {
        close.addEventListener('click', function(e) {
            e.stopPropagation();
            const tab = this.parentElement;
            const tabId = tab.getAttribute('data-tab');
            tab.remove();
            document.getElementById(`tab-${tabId}`).remove();

            // If closing an active tab, activate the first tab
            if (tab.classList.contains('active') && document.querySelector('.tab')) {
            document.querySelector('.tab').click();
            }
        });
    });
  
    document.querySelector('.add-tab').addEventListener('click', function() {
        tabCounter++;
        const newTab = document.createElement('div');
        newTab.classList.add('tab');
        newTab.setAttribute('data-tab', tabCounter);
        newTab.innerHTML = `Tab ${tabCounter} <span class="close">×</span>`;
        document.querySelector('.tabs').insertBefore(newTab, this);
      
        const newTabContent = document.createElement('div');
        newTabContent.classList.add('tab-content');
        newTabContent.setAttribute('id', `tab-${tabCounter}`);
        newTabContent.innerHTML = `<div class="row" data-tab="${tabCounter}">
                                        <div id="editor-box" class="column editor-box">
                                            <div id="editor-lines" class="editor-lines"></div>
                                            <textarea id="editor-text" class="editor-text" data-tab="${tabCounter} spellcheck="false"># Mark-Up! ${tabCounter}</textarea>
                                        </div>
                                        <div id="markdown" class="column markdown-box"></div>
                                    </div>`;
        document.querySelector('.tab-container').appendChild(newTabContent);
      
        newTab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            document.querySelectorAll('.tab, .tab-content').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
      
        newTab.querySelector('.close').addEventListener('click', function(e) {
            e.stopPropagation();
            const tab = this.parentElement;
            const tabId = tab.getAttribute('data-tab');
            tab.remove();
            document.getElementById(`tab-${tabId}`).remove();
            
            if (tab.classList.contains('active') && document.querySelector('.tab')) {
                document.querySelector('.tab').click();
            }
        });

        const textarea = newTabContent.querySelector('.editor-text');
        const index = newTabContent.querySelector('.row').getAttribute('data-tab');
        textarea.addEventListener('input', function() {
            updateMarkdown(index);
            displayLines(index);
        });
        updateMarkdown(index);
        displayLines(index);
    });
  
    // Activate the first tab by default
    document.querySelector('.tab').click();

    //activate first tab the editor by default
    const textarea = document.getElementById('editor-text');
    textarea.addEventListener('input', function() {
        updateMarkdown(1);
        displayLines(1);
    });
    updateMarkdown(1);
    displayLines(1);

});
  