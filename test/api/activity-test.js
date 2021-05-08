const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
chai.use(chaiHttp);

let token, activityId;

describe('/activity tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: 'godfatjer', password: 'hhuhu'})
            .end((err, res) => {
                token = res.body.token;
                console.log(token);
                done();
            });
    });

    describe('/GET activitys', () => {
        it('it should GET all the activitys', (done) => {
            chai.request(server)
                .get('/activity')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        })
    });

    describe('/POST movie', () => {
        it('it should POST a movie', (done) => {
            const activity = {
                activity_name:'Hasan basri bench'
            };

            chai.request(server)
                .post('/activity')
                .send(activity)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('activity_name');
                    activityId = res.body._id;
                    done();
                });
        });
    });

    describe('/GET/:activity_id activity', () => {
        it('it should GET a activity by the given id', (done) => {
            chai.request(server)
                .get('/activity' + activityId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('activity_name');
                    res.body.should.have.property('_id').eql(activityId);
                    done();
                });
        });
    });

    describe('/PUT/:activity_id activity', () => {
        it('it should UPDATE a activity given by id', (done) => {
            const activity = {
                title: '93creative',
                director_id: '5a34e1afb8523a78631f8541',
            };

            chai.request(server)
                .put('/activity' + activityId)
                .send(activity)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('activity_name').eql(activity.activity_name);

                    done();
                });
        });
    });

    describe('/DELETE/:activity_id activity', () => {
        it('it should DELETE a activity given by id', (done) => {
            chai.request(server)
                .delete('/activity' + activityId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });
});