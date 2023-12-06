const displayFormHandler = async (event) => {
    event.preventDefault();

    const monthValue = document.getElementById('month-list').value;
    const userValue = document.getElementById('user-list').value;
    const categoryValue = document.getElementById('category-list').value;

    if (monthValue && userValue && categoryValue) {
        const response = await fetch('/api/sort', {
            method: 'POST',
            body: JSON.stringify({ monthValue, userValue, categoryValue }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/sort');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.display-form')
    .addEventListener('submit', displayFormHandler);