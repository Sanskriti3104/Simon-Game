
document.querySelectorAll('.color-button').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.remove('flash'); // Remove if already exists (restarts animation)
        void button.offsetWidth; // Force reflow to allow re-adding class
        button.classList.add('flash');
    });
});
