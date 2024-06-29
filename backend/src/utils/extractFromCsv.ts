import { type User } from '../types'

export function extractFromCsv(file: any): User[] {
    try {
        const csv = file.toString()
        if (csv === '') return []

        const lines = csv.split('\r\n').map((line: string) => line.trim())
        const headers = lines[0].split(',')
        const data = lines.slice(1)

        const users = data.map((line: string) => {
            const values = line.split(',')
            const user = Object.create(null)
            values.forEach((value: string, index: number) => {
                if (value === '') throw new Error(`The value in row ${index + 1} is empty`)
                if (headers[index] === 'id') user[headers[index]] = parseInt(value, 10)
                else user[headers[index]] = value
            })
            return user
        })

        return users
    } catch (error) {
        return []
    }
}
