const supertest = require('supertest');
const { app, server } = require('../index');

const api = supertest(app);

describe('Note API', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('a valid note can be added', async () => {
        const newNote = {
            content: 'Test note',
            important: true,
        };

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/notes');
        const contents = response.body.map(r => r.content);

        expect(contents).toContain('Test note');
    });

    test('a note can be deleted', async () => {
        const response = await api.get('/api/notes');
        const notesAtStart = response.body;
        const noteToDelete = notesAtStart[0];

        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204);

        const responseAfter = await api.get('/api/notes');
        const notesAtEnd = responseAfter.body;

        expect(notesAtEnd).toHaveLength(notesAtStart.length - 1);
    });
});

afterAll(() => {
    server.close();
});
