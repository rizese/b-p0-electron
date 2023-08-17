(() => {
    let timeout;
    let fetchInProgress = false; // Flag for checking whether an asynchronous fetch is in progress

    function debounce(callback, wait) {
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(callback, wait);
        };
    }

    function loadFacePage() {
        if (!fetchInProgress) {
            window.ipcRenderer.send('load-page', 'face.html');
        }
    }

    const debouncedLoadFacePage = debounce(loadFacePage, 10000); // 10 seconds

    document.addEventListener('keydown', () => {
        debouncedLoadFacePage();
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

    // Fetch data when needed
    // fetchData();

    const inputElem = document.getElementById('input');
    inputElem.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = inputElem.value;
            inputElem.value = '';
            // Handle the command here
            console.log(`Command entered: ${command}`);
            // If you need to fetch data based on the command, you can call the fetchData function here
            // fetchData();
        }
        // Restart the timer every time a key is pressed
        debouncedLoadFacePage();
    });
})();
