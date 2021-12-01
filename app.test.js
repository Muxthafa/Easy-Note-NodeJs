const request = require('supertest')
const app = require('./index')



describe('Notes API', () => {
    it('GET all notes -> array of notes', () => {
        return request(app).get('/notes').expect('Content-Type', /json/).expect(200).then((res) =>{
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        _id: expect.any(ObjectId),
                        title: expect.any(String),
                        content: expect.any(String),
                        isTrash: expect.any(Boolean)
                    }),
                ])
            )
        })
    })
})

// it('Testing to see if Jest works', () => {
//     expect(1).toBe(1)
//   })
