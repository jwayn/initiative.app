const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Actor = require('../db/actor')

const verifyToken = require('../middleware/verify-token');

/* GET actors listing. */
router.get('/', verifyToken, async (req, res, next) => {
    try {
        const userId = req.tokenData.user_id;
        const actors = await Actor.getAllByUser(userId);

        if(actors.length) {
            res.json(actors);
        } else {
            console.error('404 yo')
            next(createError(404));
        }
    } catch(err) {
        next(err);
    }
});

/* Create new actor */
router.post('/', verifyToken, async (req, res, next) => {
    const userId = req.tokenData.user_id;
    const actor = {
        actor_name: req.body.characterName || null,
        player_name: req.body.playerName || null,
        passive_perception: req.body.passivePerception || null,
        passive_investigation: req.body.passiveInvestigation || null,
        passive_insight: req.body.passiveInsight || null,
        armor_class: req.body.armorClass || null,
        total_hit_points: req.body.hitPoints || null,
        alignment: req.body.alignment || null,
        actor_class: req.body.charClass || null,
        race: req.body.race || null,
        level: req.body.level || null,
        initiative_modifier: req.body.initiativeModifier || null,
        accent_color: req.body.accentColor || null,
        initiative_advantage: req.body.initiativeAdvantage || false,
        speed: req.body.speed || null,
        strength: req.body.strength || null,
        dexterity: req.body.dexterity || null,
        constitution: req.body.constituion || null,
        intelligence: req.body.intelligence || null,
        wisdom: req.body.wisdom || null,
        charisma: req.body.charisma || null,
        npc: req.body.npc,
        image_url: req.body.imageURL || null,
    }

    try {
        const returnedActor = await Actor.create(userId, actor);
        res.json({returnedActor});
    } catch (err) {
        next(err);
    }

});

router.delete('/', verifyToken, async (req, res, next) => {
    const userId = req.tokenData.user_id;
    const actor_id = req.body.actor_id;
    
    try {
        const existingActor = await Actor.getOneById(actor_id);
        if(existingActor && existingActor.owner === userId) {
            await Actor.delete(actor_id);
            res.sendStatus(200);
        } else {
            res.send(403);
        }
    } catch (err) {
        next(err);
    }
})

router.put('/', verifyToken, async (req, res, next) => {
    const userId = req.tokenData.user_id;
    const actor_id = req.body.actor.id;
    const actor = req.body.actor;
    
    try {
        const existingActor = await Actor.getOneById(actor_id);
        if(existingActor && existingActor.owner === userId) {
            const updatedActor = await Actor.update(actor_id, actor);
            res.json({updatedActor});
        } else {
            res.send(403);
        }
    } catch (err) {
        next(err);
    }
})

module.exports = router;
