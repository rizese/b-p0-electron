(() => {
    const faces = ["happy", "neutral", "surprise", "unsure", "hiRes"];
    let currentFaceIndex = 0;

    addEventListener('click', () => {
        window.ipcRenderer.send('load-page', 'prompt.html');
    });

    addEventListener('keydown', (event) => {
        const face = document.getElementById('bp0mask');
        face.className = '';

        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            currentFaceIndex = (currentFaceIndex - 1 + faces.length) % faces.length;
            face.classList.add(faces[currentFaceIndex]);
        } else {
            currentFaceIndex = (currentFaceIndex + 1) % faces.length;
            face.classList.add(faces[currentFaceIndex]);
        }
    });
})();
