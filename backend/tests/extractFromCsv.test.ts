import { describe, it, expect } from 'vitest'
import { extractFromCsv } from '../src/utils/extractFromCsv'

/**
 * @todo
 * 1. recibe un string con el contenido CSV y devuelve un array de User
 * 2. cada fila del CSV representa un User
 * 3. la primera fila del CSV contiene los nombres de las columnas
 * 4. las columnas son: id, name, profession, nationality, thumbnail
 *
 * @tests
 * ✅ 1. should return an empty array if the CSV is empty
 * ✅ 2. should return an array with one User if the CSV has one row
 * ✅ 3. should return an array with two Users if the CSV has two rows
 */
describe('extractFromCsv', () => {
    it('should return an empty array if the CSV is empty', () => {
        const csv = ''

        const result = extractFromCsv(csv)

        expect(result).toEqual([])
    })

    it('should return an array with one User if the CSV has one row', () => {
        const csv = `id,name,profession,nationality,thumbnail
        1,John Doe,Software Engineer,USA,https://example.com/john-doe.jpg`

        const result = extractFromCsv(csv)

        expect(result).toEqual([{
            id: 1,
            name: 'John Doe',
            profession: 'Software Engineer',
            nationality: 'USA',
            thumbnail: 'https://example.com/john-doe.jpg'
        }])
    })

    it('should return an array with two Users if the CSV has two rows', () => {
        const csv = `id,name,profession,nationality,thumbnail
        1,John Doe,Software Engineer,USA,https://example.com/john-doe.jpg
        2,Jane Doe,Data Scientist,Canada,https://example.com/jane-doe.jpg`

        const result = extractFromCsv(csv)

        expect(result).toEqual([{
            id: 1,
            name: 'John Doe',
            profession: 'Software Engineer',
            nationality: 'USA',
            thumbnail: 'https://example.com/john-doe.jpg'
        }, {
            id: 2,
            name: 'Jane Doe',
            profession: 'Data Scientist',
            nationality: 'Canada',
            thumbnail: 'https://example.com/jane-doe.jpg'
        }])
    })
})
