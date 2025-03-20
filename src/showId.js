function showId() {

    const array = document.querySelectorAll('li');
        array.forEach(element => {
    element.addEventListener('click', () => {
        console.log(element.id);
    })
});
}

export default showId;
