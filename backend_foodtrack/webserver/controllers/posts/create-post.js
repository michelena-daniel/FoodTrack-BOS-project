'use strict'

const Joi = require('joi');
const uuidV4 = require('uuid/v4');
const trackingPostModel = require('../../../models/tracking-post');

async function validate(payload){
    
    const schema = {
        foodName: Joi.string().min(4).max(64).required(),
        description: Joi.string().min(4).max(256),
        calories: Joi.number().positive(),
        mealTime: Joi.string(),
     };

     return Joi.validate(payload, schema);
}

async function createPosts(req, res){
    
    const postData = {...req.body };
    const foodUuid = uuidV4();
    const { uuid } = req.claims;

    try{
        
        await validate(postData);
    }catch(e){
        
        return res.status(400).send(e);
    }

    try{            
        const data = {
            $push: {
                post: {
                    foodUuid,
                    pictureUrl: null,
                    foodName: postData.foodName,
                    description: postData.description,
                    calories: postData.calories,
                    mealTime: postData.mealTime
                },
            },
        };
        const trackingPostCreated = await trackingPostModel.findOneAndUpdate({ uuid }, data);

        // await trackingPostModel.findOneAndUpdate(
        //     { uuid }, 
        //     { $push: { 
        //               post: {
        //                 "foodUuid" : foodUuid,
        //                 "pictureUrl": null,
        //                 "foodName" : postData.foodName,
        //                 "description": postData.description,
        //                 "calories": postData.calories,
        //                 "mealTime": postData.mealTime
        //                 }  
        //             } 
        //     })

        return res.status(200).send(trackingPostCreated);
    }catch(e){

        return res.status(500).send(e.message);
    }

}

module.exports = createPosts;