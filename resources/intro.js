if (window.localStorage.getItem(`first_time`) == null) {
    window.localStorage.setItem(`first_time`, "false");
      run_intro();
}

function run_intro() {
    const intro = document.createElement('div');
    intro.id = 'intro';

    const button = document.createElement('button');
    button.id = 'intro-button';
    button.innerHTML = 'Iniciar Introdução'.toUpperCase();
    button.addEventListener('click', () => {
        play(intro)
    });

    intro.appendChild(button);
    document.body.appendChild(intro);


}

const synth = window.speechSynthesis;

function speak(text, callback = () => { }) {
    // Volume
    synth.volume = 1;
    // Rate
    synth.rate = 4;
    // Pitch
    synth.pitch = 1.3;
    // PT-BR
    synth.lang = 'pt-BR';
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
    utterance.onend = callback;
}


function writeCode(txt, update = false) {
    editor.value = '';
    const len = txt.length;
    const interval = setInterval(() => {
        editor.value += txt.substring(0, 1);
        txt = txt.substring(1, txt.length);
        // Scroll to the end of the code
        editor.focus();
        editor.selectionStart = editor.selectionEnd = editor.value.length;
        editor.scrollTop = editor.scrollHeight;

        if (txt.length == 0) {
            clearInterval(interval);
        }

        if (update) {
            try{document.head.removeChild(document.getElementById('editor-style'));}catch(err){}
            const css = editor.value;
            const style = document.createElement('style');
            style.id = 'editor-style';
            style.innerHTML = css;
            document.head.appendChild(style);
        }
    }, 30);
}


function play(el) {
    const texts = [
        "Olá, seja bem vindo ao Aprenda CSS!",
        "Neste tutorial você aprenderá como utilizar o ambiente.",
        "Primeiro, você pode escrever o seu código CSS no editor de texto à esquerda.",
        "Neste exemplo, estamos animando o nosso personagem, que fica à direita.",
        "Além disso, você pode personalizar as cores do seu personagem através da propriedade fill.",
        "Pra finalizar, você pode clicar no personagem para adicionar automaticamente o código CSS no editor de texto.",
        "Agora é com você!"

    ]

    document.getElementById('intro-button').remove();
    document.body.style.cursor = 'none';
    speak(texts[0], () => {
        speak(texts[1], () => {
            el.style.left = "50%";
            el.style.backgroundColor = "#1b1b2e";
            writeCode(e01);
            speak(texts[2], () => {
                speak(texts[3], () => {
                    el.style.left = "-50%";
                    setTimeout(() => {
                        const css = editor.value;
                        const style = document.createElement('style');
                        style.id = 'editor-style';
                        style.innerHTML = css;
                        document.head.appendChild(style);
                        speak(texts[4], () => {
                            el.style.left = "-100%";
                            el.style.backgroundColor = "transparent";
                            writeCode(e02, true);
                            speak(texts[5], () => {
                                const { x, y } = hair[0].getBoundingClientRect();
                                const mouse = new Image();
                                mouse.src = `./resources/cursor.png`;
                                mouse.style.position = `fixed`;
                                mouse.style.top = `200%`;
                                mouse.style.left = `100%`;
                                mouse.style.width = `50px`;
                                mouse.style.height = `50px`;
                                mouse.style.transition = `all 1s ease-in-out`;
                                mouse.style.zIndex = "9999";
                                mouse.style.transformOrigin = "center";
                                document.body.appendChild(mouse);

                                setTimeout(() => {
                                    mouse.style.top = `${y + 20}px`;
                                    mouse.style.left = `${x + 30}px`;
                                    setTimeout(() => {
                                        highlight(hair);
                                        setTimeout(() => {
                                            mouse.style.transform = `scale(0.9)`;
                                            verifyCSS(`.hair`);
                                            setTimeout(() => {
                                                mouse.remove();
                                                hair[0].style.fill = `#F2E677`;
                                                document.body.style.cursor = 'default';
                                                speak(texts[6], () => {
                                                    document.getElementById('intro').remove();
                                                    window.localStorage.setItem(`first_time`, false);
                                                });
                                            }, 500);
                                        }, 500);
                                    }, 900);


                                }, 1000);
                            })
                        });
                    });
                }, 500);
            });
        });
    });



}