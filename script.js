const game = {
    currentKeyword: null,
    currentLetters: null,
    attempts: 5,
    elemSentence: document.querySelector(".keyword"), //element z hasłem do zgadnięcia
    elemAttempts: document.querySelector(".attempts"), //element z liczba prob
    elemLetters: document.querySelector(".letter-board"), //lista z literkami do klikania
    keywords: ["Money", "Rectangle", "Flower", "Cucumber", "Horse", "Carpet"],
}