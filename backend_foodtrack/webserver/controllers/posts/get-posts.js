'use strict'

const trackingPostModel = require('../../../models/tracking-post');

async function getPosts(req, res){

    const { uuid } = req.claims;

    try{
        const posts = await trackingPostModel.findOne({ uuid }, {_id: 0, __v: 0}).lean();

        return res.status(200).send(posts);
    }catch(e){
        return res.status(500).send(e.message);
    }
}

module.exports = getPosts;