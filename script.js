document.getElementById('verbSelector').addEventListener('change', function() {
    const verb = this.value;
    if (verb) {
        // Carregar o JSON e fazer a conjugação
        fetch('verbs.json') // Ajuste o caminho para o local correto do seu JSON
            .then(response => response.json())
            .then(data => {
                conjugateVerb(verb, data);
                document.getElementById('conjugationContainer').style.display = 'block';
            })
            .catch(error => {
                console.error('Error loading the JSON file:', error);
            });
    } else {
        document.getElementById('conjugationContainer').style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let words = [];
    let currentIndex = 0;
    let knownCount = 0;

    // Carrega palavras do JSON
    fetch('words.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            words = data.words;
            console.log('Words loaded:', words); // Verifica se as palavras foram carregadas corretamente
        })
        .catch(error => console.error('Error loading words JSON:', error));

    const wordDisplay = document.getElementById('wordDisplay');
    const knowButton = document.getElementById('knowButton');
    const dontKnowButton = document.getElementById('dontKnowButton');
    const result = document.getElementById('result');
    const quizContainer = document.getElementById('quizContainer');
    const startQuizButton = document.getElementById('startQuizButton');

    startQuizButton.addEventListener('click', () => {
        startQuiz();
    });

    knowButton.addEventListener('click', () => {
        knownCount++;
        nextWord();
    });

    dontKnowButton.addEventListener('click', () => {
        nextWord();
    });

    function startQuiz() {
        quizContainer.style.display = 'block';
        startQuizButton.style.display = 'none'; // Oculta o botão de iniciar quiz
        displayWord();
    }

    function displayWord() {
        if (currentIndex < words.length) {
            wordDisplay.textContent = words[currentIndex];
        } else {
            showResult();
        }
    }

    function nextWord() {
        currentIndex++;
        displayWord();
    }

    function showResult() {
        const totalWords = words.length;
        result.textContent = `Você conhece ${knownCount} de ${totalWords} palavras (${((knownCount / totalWords) * 100).toFixed(2)}%)`;
        wordDisplay.textContent = '';
    }
});




function conjugateVerb(verb, data) {
    const verbTitle = document.getElementById('verbTitle');
    const tensesDiv = document.getElementById('tenses');
    
    // Limpando o conteúdo anterior
    verbTitle.textContent = `Verb: ${verb}`;
    tensesDiv.innerHTML = '';
    
    // Mapeamento de conjugação para o verbo selecionado
    const tenseConjugations = data[verb] || {
        presentSimple: `${verb}`,
        pastSimple: `${verb}ed`,
        futureSimple: `will ${verb}`
    };

    const tenses = [
        {
            name: 'Present Simple',
            conjugation: tenseConjugations.presentSimple,
            example: tenseConjugations.presentExample || `I ${tenseConjugations.presentSimple} you every day.`
        },
        {
            name: 'Past Simple',
            conjugation: tenseConjugations.pastSimple,
            example: tenseConjugations.pastExample || `I ${tenseConjugations.pastSimple} you yesterday.`
        },
        {
            name: 'Future Simple',
            conjugation: tenseConjugations.futureSimple,
            example: tenseConjugations.futureExample || `I will ${verb} you tomorrow.`
        }
    ];

    // Adiciona cada tempo verbal com exemplo à tela
    tenses.forEach(tense => {
        const tenseDiv = document.createElement('div');
        tenseDiv.classList.add('tense');

        const tenseTitle = document.createElement('h3');
        tenseTitle.textContent = tense.name;

        const conjugation = document.createElement('p');
        conjugation.textContent = `Conjugation: ${tense.conjugation}`;

        const example = document.createElement('p');
        example.textContent = `Example: ${tense.example}`;

        

        // Link para a música
        const songLink = document.createElement('p');
        const songUrl = tenseConjugations.songLink; // Corrigido para songLink
        if (songUrl) {
            songLink.innerHTML = `Listen to the song: <a href="${songUrl}" target="_blank">here</a>`;
        }

        // Botão de som
        const soundButton = document.createElement('button');
        soundButton.textContent = '🔊'; // Emoji de alto-falante como ícone

        soundButton.addEventListener('click', () => {
            speakText(tense.example);
        });

        tenseDiv.appendChild(tenseTitle);
        tenseDiv.appendChild(conjugation);
        tenseDiv.appendChild(example);
        tenseDiv.appendChild(soundButton); // Adiciona o botão de som ao div do tempo verbal
        tenseDiv.appendChild(songLink); // Adiciona o link da música

        tensesDiv.appendChild(tenseDiv);
    });
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Define o idioma para inglês
    utterance.rate = 0.8; // Ajuste a taxa de leitura (0.1 a 10, sendo 1 a taxa padrão)
    speechSynthesis.speak(utterance);
}
