const request = require('supertest');
const mongoose = require('mongoose');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
let server;

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    await server.close();
    await Genre.deleteMany({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        { name: 'genre1' },
        { name: 'genre2' }
      ]);

      const res = await request(server).get('/api/genres');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a genre if a valid id is passed', async () => {
      const genre = new Genre({ genre: 'genre1' });
      await genre.save();

      await request(server)
        .get('/api/genres/' + genre._id)
        .catch(e => {
          expect(e.status).toBe(200);
          expect(e.body).toHaveProperty('genre', genre.genre);
        });
    });

    it('should return 404 if invalid id is passed', async () => {
      await request(server)
        .get('/api/genres/1')
        .catch(e => {
          expect(e.status).toBe(404);
        });
    });

    it('should return 404 if no genre with the given id exist', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get('/api/genres/' + id);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    // Test suite settings
    let token;
    let genre;

    const exec = async () => {
      return await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ genre });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      genre = 'genre1';
    });

    it('should return 401 if client is not logged in', async () => {
      let token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if genre is less than 5 charactrers', async () => {
      let genre = '1234';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 50 charactrers', async () => {
      genre = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should save the genre if it is valid', async () => {
      await exec();

      const genre = await Genre.find({ genre: 'genre1' });

      expect(genre).not.toBeNull();
    });

    it('should return the genre if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('genre', 'genre1');
    });
  });
});
