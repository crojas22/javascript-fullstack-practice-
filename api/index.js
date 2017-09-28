import express from 'express';
// import needed to work with mongodb
import {MongoClient, ObjectID} from 'mongodb';
import assert from 'assert';
import config from '../config';

let mdb;
MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(err, null);
  mdb = db;
});

const router = express.Router();

// to change data from array to object
// const contests = data.contest.reduce((obj, cont) => {
//   obj[cont.id] = cont;
//   return obj;
// }, {});

router.get('/contests', (req, res) => {
  let contests = {};
  //
  mdb.collection('contests').find({})
    // can control what info will be sent from db
    .project({
      id: 1,
      categoryName: 1,
      contestName: 1,
      nameIds: 1
    })
    .each((err, contest) => {
      assert.equal(err, null);
      if(!contest) {
        res.send({contests});
        return;
      }
      contests[contest._id] = contest;
    });
});

router.get('/names/:nameIds', (req, res) => {
  // in mongo _id is an ObjectID
  const nameIds = req.params.nameIds.split(',').map(ObjectID);
  let names = {};
  // looking in an array in mongodb
  mdb.collection('names').find({_id: {$in: nameIds}})
    .each((err, name) => {
      assert.equal(err, null);
      if(!name) {
        res.send({names});
        return;
      }
      names[name._id] = name;
    });
});

router.get('/contests/:contestId', (req, res) => {
  mdb.collection('contests')
    .findOne({_id: ObjectID(req.params.contestId)})
    .then(contest => res.send(contest))
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

router.post('/names', (req, res) => {
  const contestId = ObjectID(req.body.contestId);
  const name = req.body.newName;
  mdb.collection('names').insertOne({name}).then(result =>
    mdb.collection('contests').findAndModify(
      {_id: contestId},
      [],
      {$push: {nameIds: result.insertedId}},
      {new: true}
    ).then(doc =>
      res.send({
        updatedContest: doc.value,
        newName: {_id: result.insertedId, name}
      })
    )
  ).catch(error => {
    console.error(error);
    res.status(404).send('Bad Request');
  });
});

export default router;
