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
                                            <textarea id="editor-text" class="editor-text" spellcheck="false"># Mark-Up!</textarea>
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
            alert(index);
        });
    });
  
    // Activate the first tab by default
    document.querySelector('.tab').click();
});
  