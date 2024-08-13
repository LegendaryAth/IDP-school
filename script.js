const messages = [
    "Reduce, Reuse, Recycle!",
    "Keep the Earth clean, it’s not Uranus.",
    "Waste is a terrible thing to mind.",
    "Do your part, be waste smart!",
    "Every little bit helps!",
    "The Earth is what we all have in common.",
    "There is no Planet B.",
    "The future depends on what we do today.",
    "Let’s make our planet green and clean.",
    "Save the planet, it’s the only one with chocolate.",
    "Don’t throw it away, it can be used in some other way.",
    "Turn off the lights, save some watts.",
    "Plant trees, save bees, clean seas.",
    "Be the change you want to see in the world.",
    "Respect your mother (Earth)."
];
function showRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];
    document.getElementById("message-box").textContent = randomMessage;
}

window.onload = showRandomMessage;

const ai_button = document.querySelector('#AIButton');

ai_button.addEventListener('click', () => {
    
});
