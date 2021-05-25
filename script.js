const game = {
    currentKeyword: [], //tablica znakow obecnego keywordu
    elemSentence: document.querySelector(".keyword"), //element z hasłem do zgadnięcia
    elemAttempts: document.querySelector(".attempts"), //element z liczba prob
    elemLetters: document.querySelector(".letter-board"), //lista z literkami do klikania
    keywords: ["money", "rectangle", "flower", "cucumber", "horse", "carpet"],

    generateLetters() { //generujemy tablicę z literkami, które zostaną uzyte do utworzenia przycisków
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split("");
        alphabet.forEach(letter => {
            const button = document.createElement("button");
            button.classList.add("letter-tile");
            button.type = "button";
            button.dataset.letter = letter;
            button.innerText = letter;
            this.elemLetters.appendChild(button);
        });
    },

    disableYourTile() { //sprawdza czy kafelek zawiera klase letter-tile. Jesli tak, to go wyłącza
        this.elemLetters.addEventListener("click", e => {
            if (e.target.classList.contains("letter-tile")) {
                const letter = e.target.dataset.letter;
                e.target.disabled = true;
            }
        })
    },

    showGame() { //aktywuje elementy gry po kliknięciu na start
        let click = 0;
        const btnStart = document.querySelector(".start");
        btnStart.addEventListener("click", e => {
            if (click !== 0) {
                location.reload(true);
            }
            btnStart.textContent = "Try again";
            this.elemAttempts.style.display = "block";
            this.elemLetters.style.display = "flex";
            this.elemSentence.style.display = "flex";
            click++;
        })
    },

    randomKeyword() { //losuje słowo z puli
        const keyword = Math.floor(Math.random() * (this.keywords.length - 1) + 1);
        return this.keywords[keyword];
    },

    generateKeywordBars() { //tworzy pola keywordu
        const tabOfLetters = this.randomKeyword().split('');
        this.currentKeyword = tabOfLetters;
        tabOfLetters.forEach(letter => {
            const tile = document.createElement("div");
            tile.classList.add("letter-tile");
            tile.classList.add("keyword-tile");
            tile.dataset.letter = letter;
            tile.innerText = ' ';
            this.elemSentence.appendChild(tile);
        })
    },

    verifyYourGuess() { //sprawdza czy kafelek z puli do strzelania, który kliknęliśmy jest w haśle - jeśli tak, to dodaje do hasła i pokazuje wszystkie jego powtórzenia, jeśli nie to nalicza próby nietrafione
        let counterOfGoodLetters = 0;
        let counterOfBadLetters = 5;
        this.elemLetters.addEventListener("click", event => {
            let missed = true;
            const tableOfTiles = document.querySelectorAll(".keyword-tile");
            tableOfTiles.forEach(tile => {
                if (event.target.dataset.letter === tile.dataset.letter) {
                    missed = false;
                    tile.innerText = tile.dataset.letter;
                    counterOfGoodLetters++;
                    if (counterOfGoodLetters === tableOfTiles.length) {
                        this.gameComplete();
                    }
                }
            });
            if (missed) {
                counterOfBadLetters--;
                this.elemAttempts.innerText = counterOfBadLetters;
                if (counterOfBadLetters === 0) {
                    this.disableAllLetters();
                    this.gameOver();
                }
            }
        })
    },

    disableAllLetters() {
        const letters = this.elemLetters.querySelectorAll('.letter-tile');
        letters.forEach(letter => letter.disabled = true);
    },

    enableAllLetters() {
        const letters = this.elemLetters.querySelectorAll('.letter-tile');
        letters.forEach(letter => letter.disabled = false);
    },

    gameOver() {
        alert("You lose.");
        this.disableAllLetters();
    },

    gameComplete() {
        alert("You won!");
        this.disableAllLetters();
    },

    initBoard() {
        this.generateLetters();
        this.disableYourTile();
    },

    startGame() {
        this.showGame();
        this.showAttemps();
    },
};

game.initBoard();
game.showGame();
game.randomKeyword();
game.generateKeywordBars();
game.verifyYourGuess();
