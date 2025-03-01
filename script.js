function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const phrases = ["S Cube Innovation"];
const el = document.getElementById("typewriter");
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

setTimeout(() => {
    // Move left half to the left
    document.querySelector(".left-half").style.transform = "translateX(-100%)";

    // Move right half to the right
    document.querySelector(".right-half").style.transform = "translateX(100%)";

}, 2000); // Start animation after 2 seconds

document.querySelector(".plus").addEventListener("mouseover", () => {
    document.querySelector(".plus").style.transform = "rotate(180deg) scale(1.2)";
});

document.querySelector(".plus").addEventListener("mouseout", () => {
    document.querySelector(".plus").style.transform = "rotate(0deg) scale(1)";
});
 // Start animation after 2 seconds
