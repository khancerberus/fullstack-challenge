import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000"
})

const uploadFile = async ({ file }: { file: File }) => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await api.post("/api/files", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
}

const fetchUsers = async ({ search }: { search: string }) => {
    const response = await api.get('/api/users', {
        params: {
            q: search
        }
    })
    return response.data
}

export const UserService = {
    uploadFile,
    fetchUsers
}
