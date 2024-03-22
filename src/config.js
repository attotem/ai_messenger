
const API_BASE_URL = "https://webhoooks-dmitrykarpov.pythonanywhere.com";

export const createThread = () => {
    return fetch(`${API_BASE_URL}/create_thread`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        cache: "no-cache"
    })
    .then(response => response.json())
    .catch(error => {
        console.error("Error fetching data:", error);
        throw error; 
    });
}

export const addMessage = (newMessage, thread_id) => {
    return fetch(`${API_BASE_URL}/add_message`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: newMessage,
            thread_id: thread_id,
        })
    })
    .then(response => response.json())
    .catch(error => {
        console.error("Error fetching data:", error);
        throw error; 
    });
}
