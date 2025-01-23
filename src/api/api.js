import axios from "axios"


const api=axios.create({
    baseURL:"http://localhost:3000/api",
    timeout: 5000, // Optional: Set a timeout in milliseconds
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Optional: Add auth token dynamically
    },
})

export default api