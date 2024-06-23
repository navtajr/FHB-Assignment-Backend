const request = require('supertest');
const express = require('express');
const app = require('../index.js'); // Adjust the path if necessary

describe('Notes API', () => {
    it('should return all notes', async () => {
        const response = await request(app).get('/api/notes');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should create a new note', async () => {
        const newNote = {
            content: "Test Note",
            important: true,
        };

        const response = await request(app)
            .post('/api/notes')
            .send(newNote);

        expect(response.statusCode).toBe(200);
        expect(response.body.content).toBe(newNote.content);
    });
});
