const body = document.querySelectorAll('.body');
const shirt = document.querySelectorAll('.shirt');
const pants = document.querySelectorAll('.pants');
const boots = document.querySelectorAll('.boots');
const hair = document.querySelectorAll('.hair');
const eyes = document.querySelectorAll('.eyes');
const mouth = document.querySelectorAll('.mouth');
const nose = document.querySelectorAll('.nose');

const editor = document.querySelector('#editor');


const all_parts = [body, shirt, pants, boots, hair, eyes, mouth, nose];
const colors_dict = {}

function highlight(elements) {
    elements.forEach(el => {
        el.style.fill = '#cff3ff';
    });
}

all_parts.forEach(part => {
    colors_dict[part[0].className.baseVal] = part[0].getAttribute('fill');
    part.forEach(el => {
        // Remove the fill attribute from the svg
        el.removeAttribute('fill');
        el.addEventListener('mouseover', () => {
            highlight(part);
        });
        el.addEventListener('mouseout', () => {
            part.forEach(el => {
                el.style.fill = el.getAttribute('fill');
            });
        });

        el.addEventListener('click', () => {
            const className = `.${el.className.baseVal}`;
            const color = el.getAttribute('color');
            verifyCSS(className);
        });
    });
});









function verifyCSS(className){
    const finder = editor.value.indexOf(className);
    const color = colors_dict[className.substring(1, className.length)];
    if(finder == -1){
        // copy all the code from the editor
        const code = editor.value;
        // add the new class to the code
        const newCode = code + `
\n
${className} {
\nfill: ${color}\n
}
`;
        
        const len = newCode.length - 2; 
        // set the new code to the editor
        editor.value = newCode;
        editor.focus();
        // set the cursor to the end of the new code
        editor.selectionEnd= len - 2;

    }
    else{
        const value = editor.value.substring(finder, editor.value.length);
        const end = value.indexOf('}');

        editor.focus();

        editor.selectionStart = finder + (end - 2);
        editor.selectionEnd = finder + (end - 2);

    }
}


editor.addEventListener('keyup', (e) => {
    
    try{
        document.head.removeChild(document.getElementById('editor-style'));
    }
    catch(err){}
    const css = editor.value;
    const style = document.createElement('style');
    style.id = 'editor-style';
    style.innerHTML = css;
    document.head.appendChild(style);
});


editor.addEventListener('keydown', (e) => {
    // If click on tab
    if(e.keyCode == 9){
        // Get the cursor position
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        // Get the text before and after the cursor
        const before = editor.value.substring(0, start);
        const after = editor.value.substring(end, editor.value.length);
        // Add the tab to the text
        const tab = '    ';
        editor.value = before + tab + after;
        // Set the cursor position
        editor.selectionStart = editor.selectionEnd = start + tab.length;
        e.preventDefault();
    }
});