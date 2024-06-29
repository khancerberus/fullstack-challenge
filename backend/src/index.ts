import express, { type RequestHandler } from 'express'
import multer from 'multer'
import cors from 'cors'
import { type User } from './types'
import { extractFromCsv } from './utils/extractFromCsv'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const app = express()
app.use(express.json())
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST']
    })
)

let users: User[] = []

app.post('/api/files', upload.single('file'), (async (req, res) => {
    const file = req.file

    try {
        if (file == null) {
            throw new Error('No se ha enviado ningún archivo')
        }

        users = extractFromCsv(file.buffer.toString())
        return res.json({ message: 'El archivo se cargó correctamente' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
}) as RequestHandler)

app.get('/api/users', (req, res) => {
    const search = req.query.q ?? ''
    try {
        if (typeof search !== 'string') {
            throw new Error('El parámetro de búsqueda no es válido')
        }

        if (search === '') return res.json(users)

        return res.json(
            users.filter((user) =>
                user.name
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
            )
        )
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
