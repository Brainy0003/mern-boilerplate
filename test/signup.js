import chai from 'chai';
import chaiHttp from 'chai-http';
const should = chai.should();

import app from '../app';
import User from '../models/User';

chai.use(chaiHttp);

describe('/auth/signup', () => {
    it('it should signup a user with right credentials', (done) => {
        let user = {
            username: 'tester',
            password: 'test',
            password_verification: 'test'
        };
        chai.request(app)
            .post('/auth/signup')
            .send(user)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a.string;
                done();
            });
    });

    it('it should not signup a user with two different passwords', (done) => {
        let user = {
            username: 'tester',
            password: 'test',
            password_verification: 'tset'
        };
        chai.request(app)
            .post('/auth/signup')
            .send(user)
            .end((err, res) => {
                res.status.should.equal(401);
                res.body.should.have.property('error');
                done();
            });
    });
});