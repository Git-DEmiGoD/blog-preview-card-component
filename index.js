const canvas = document.querySelector('#confetti')
const card = document.querySelector('.card')
const mainWrapper = document.querySelector('.main-wrapper')
const jsConfetti = new JSConfetti({ canvas })

const focusText = mainWrapper.appendChild(document.createElement("div"))

document.addEventListener('DOMContentLoaded', () => {
    focusText.innerText = 'Hover on the card to see something cool ...'
    focusText.classList.add('focusText')
    focusText.classList.add('focusTextAnimate')
})

let confettiTimeout;

card.addEventListener('mouseover', function handler() {

    focusText.style.opacity = 0; //hide focus text

    clearTimeout(confettiTimeout); //clear any previous timeouts

    confettiTimeout = setTimeout(() => {
        jsConfetti.addConfetti({
            confettiRadius: 3,
            confettiNumber: 1000,
        }).then(() => {

            //make a button appear that can re-run the confetti animation
            const triggerConfettiBtn = document.body.appendChild(document.createElement("div"))
            triggerConfettiBtn.innerText = 'Replay Confetti'
            triggerConfettiBtn.classList.add('triggerConfettiBtn')
            triggerConfettiBtn.addEventListener('click', () => {
                jsConfetti.addConfetti({
                    confettiRadius: 3,
                    confettiNumber: 1000,
                })
            })
        })

        //remove the event on hover so that animation triggers only once.
        card.removeEventListener('mouseover', handler)
    }, 300)
})

card.addEventListener('mouseout', () => {
    clearTimeout(confettiTimeout);
})

window.addEventListener('beforeunload', () => {
    clearTimeout(confettiTimeout);
});
