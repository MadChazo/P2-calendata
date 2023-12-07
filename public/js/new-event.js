async function newFormHandler(event) {
    event.preventDefault();

   /* try {
        // Fetch the user ID from the server (stored in the session)
        const response = await fetch("/api/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
        console.error('Failed to fetch user information');
        return;
        }

        const userData = await response.json();
        const user_id = userData.id;
        */


/*
        const title = document.querySelector('#event_title').value;
        const description = document.querySelector('#event_description').value;
        const location = document.querySelector('#event_location').value;
        const start_date_input = document.getElementById('starttime');
        const test = start_date_input.value;
        // make start time a date datatype
        const start_date = start_date_input.value;
        const end_date_input = document.getElementById('endtime');
        // make end time a date datatype
        const end_date = end_date_input.value;

        const eventResponse = await fetch("/api/events", {
            method: "POST",
            body: JSON.stringify({ title, description, location, start_date, end_date, category_id: '1' }),
            headers: { "Content-Type": "application/json" },
        });
        
        if (eventResponse.ok) {
            document.location.replace('/');
            alert(test)
        } else {
                alert('Failed to add new event');
        }
    */

    await fetch('/api/events',{
        method: "POST",
        body: {"hello"},
        headers: { "Content-Type": "application/json" },
    })
}

  
document.querySelector('.add-event-form').addEventListener('submit', newFormHandler);
    