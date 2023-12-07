const router = require('express').Router();
const { Events } = require('../../models');

router.post('/', async (req, res) => {
  //console.log(':::::::::::::::::',req.body)

  try {
    const newEvent = await Events.create({
      ...req.body,
      user_id: req.session.userID,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
  /*
  res.send ("OK");
  */
});



router.delete('/:id', async (req, res) => {
  try {
    const eventData = await Events.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.userID,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: 'No event found with this id!' });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
