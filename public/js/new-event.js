async function newFormHandler(event) {
    event.preventDefault();


        const title = document.querySelector('#event_title').value.trim();
        const description = document.querySelector('#event_description').value.trim();
        const location = document.querySelector('#event_location').value.trim();
        const start_date_input = document.getElementById('starttime');
        //const test = start_date_input.value;

        // make start time a date datatype
        const start_date = start_date_input.value;
        const end_date_input = document.getElementById('endtime');
        // make end time a date datatype
        const end_date = end_date_input.value;
        const dropdown_input = document.getElementById('category_options');
        // make end time a date datatype
        const category_id = dropdown_input.value;

        const eventResponse = await fetch("/api/events", {
            method: "POST",
            body: JSON.stringify({ title, description, location, start_date, end_date, category_id }),
            headers: { "Content-Type": "application/json" },
        });
        
        if (eventResponse.ok) {
            document.location.replace('/');
            //alert(category_id)
        } else {
                alert('Failed to add new event');
        }

}

  
document.querySelector('.add-event-form').addEventListener('submit', newFormHandler);
    