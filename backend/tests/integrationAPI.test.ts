import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';

describe('Integration Test, testing API endpoints', () => {

    test('Testing endpoint GET /dashboard - testing with a real userID from DDBB', async() => {

        const res = await request(app).get('/dashboard/user/699c9b32d5e6e90cb3b09cf1');

        expect(res.status).toBe(200);

    });

    test('Testing endpoint GET /dashboard - testing with an unreal userID from DDBB', async() => {

        const res = await request(app).get('/dashboard/user/652f1a3a4b1c2d3e4f5a6b7g');

        expect(res.status).toBe(404);

    })

})