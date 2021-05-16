const game = {
    currentKeyword: null,
    currentLetters: null,
    attempts: 5,
    elemSentence: document.querySelector(".keyword"), //element z hasłem do zgadnięcia
    elemAttempts: document.querySelector(".attempts"), //element z liczba prob
    elemLetters: document.querySelector(".letter-board"), //lista z literkami do klikania
    keywords: ["Money", "Rectangle", "Flower", "Cucumber", "Horse", "Carpet"],

    generateLetters() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split("");
        console.log(alphabet);

        alphabet.forEach(letter => {
            const button = document.createElement("button");
            button.classList.add("letter-tile");
            button.type = "button";
            button.dataset.letter = letter;
            button.innerText = letter;
            this.elemLetters.appendChild(button);
        });
    },

    initBoard() {
        this.generateLetters();
    }
};

const btnStart = document.querySelector(".start");
btnStart.addEventListener("click", game.initBoard())
