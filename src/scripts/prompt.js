(() => {
    const DEBOUNCE_LIMIT = 10 * 1000; // 10 seconds
    const PROGRESS_UPDATE = 100;

    let timeout;
    let fetchInProgress = false; // Flag for checking whether an asynchronous fetch is in progress
    let timePassed = 0;

    function updateProgressBar() {
        const progressBar = document.getElementById('progress');
        const progress = (timePassed / DEBOUNCE_LIMIT) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function debounce(callback, wait) {
        return function () {
            clearInterval(timeout);
            timePassed = 0;
            updateProgressBar();
            timeout = setInterval(() => {
                timePassed += PROGRESS_UPDATE;
                updateProgressBar();
                if (timePassed >= wait) {
                    clearInterval(timeout);
                    callback();
                }
            }, PROGRESS_UPDATE);
        };
    }

    function loadFacePage() {
        if (!fetchInProgress) {
            window.ipcRenderer.send('load-page', 'face.html');
        }
    }

    const debouncedLoadFacePage = debounce(loadFacePage, DEBOUNCE_LIMIT);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            loadFacePage();
        } else {
            debouncedLoadFacePage();
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        debouncedLoadFacePage();
    });

    async function fetchData() {
        fetchInProgress = true;
        // Perform your fetch operation here
        await fetch('https://api.example.com/data');
        fetchInProgress = false;
        debouncedLoadFacePage(); // Restart the timer after the fetch is completed
    }

    const inputElem = document.getElementById('input');
    inputElem.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = inputElem.value;
            inputElem.value = '';
            console.log(`Command entered: ${command}`);
        }
        debouncedLoadFacePage();
    });
})();
