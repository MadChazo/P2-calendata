async function newFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('#event_title').value;
    const description = document.querySelector('#event_description').value;
    const location = document.querySelector('#event_location').value;
    const start_date_input = document.getElementById('#starttime');
    // make start time a date datatype
    const start_date = new Date(Date.parse(start_date_input));
    const end_date_input = document.getElementById('#endtime');
    // make end time a date datatype
    const end_date = new Date(Date.parse(end_date_input));
    /// change this
    const category_id = 1;


    const response = await fetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            category_id,
            start_date,
            end_date,
            description,
            location
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (response.ok) {
        document.location.replace('/');
    } else {
            alert('Failed to add new event');
        }
    }
  
    document.querySelector('.add-event-form').addEventListener('submit', newFormHandler);
    