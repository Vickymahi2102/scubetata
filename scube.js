function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const phrases = ["X3 Growth -> X3 "];
const el = document.getElementById("typewrite");
let sleepTime = 100;
let curphraseIndex = 0;
const writeLoop = async () => {
    while (true) {
        let curWord = phrases[curphraseIndex];
        for (let i = 0; i < curWord.length; i++) {
            el.innerText = curWord.substring(0 , i+1);
            await sleep(sleepTime);
        } 
        await sleep(sleepTime * 10);

        for (let i = curWord.length; i > 0; i--) {
            el.innerText = curWord.substring(0 , i-1);
            await sleep(sleepTime);
        }
        await sleep(sleepTime * 5);

        if(curphraseIndex === phrases.length - 1) {
            curphraseIndex = 0;
        } else {
            curphraseIndex++;
        }
    }
};
writeLoop();