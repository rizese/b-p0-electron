(() => {

    const faces = ["happy", "neutral", "surprise", "unsure"];
    
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }
    
    addEventListener('keydown', (event) => {
        const face = document.getElementById('bp0mask')
        const i = getRandomInt(faces.length)
        face.className = ''
        face.classList.add(faces[i])
    });
 
})();