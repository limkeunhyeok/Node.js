const request = require('supertest');
const server = require('../server');

describe('GET /', () => {
    it('should render ok', (done) => {
        request(server)
        .get('/')
        .expect(200, done);
    });
});

describe('GET /bikes', () => {
    it('should not found', (done) => {
        request(server)
        .get('/bikes')
        .expect(404, done);
    });
});
