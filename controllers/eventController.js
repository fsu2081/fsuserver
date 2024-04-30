const Event = require('../model/Event');

const handleNewEvent = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const title = req.body.title;
  const content = req.body.content;
  const image = req.file;
  const registration = req.body.registration;
  const facebook = req.body.facebook;
  const date = req.body.date;

  let imageUrl;
  if (image) {
    imageUrl = image.destination + '/' + image.filename;
  }

  if (!title) {
    return res.status(400).json({
      status: 'error',
      message: 'Title is a required field',
    });
  }
  try {
    const result = await Event.create({
      title: title,
      image: imageUrl,
      content: content,
      registration: registration,
      facebook: facebook,
      date: date,
    });
    return res
      .status(201)
      .json({ status: 'success', message: 'New Event is published' });
  } catch (error) {
    console.log(error);
  }
};

// const getAllEvent = async (req, res) => {
//   const { page = 1, limit = 5 } = req.query;
//   const currentDate = new Date();
//   try {
//     let allEvents;
//     if (req.query.page == 'all') {
//       allEvents = await Event.find();
//       res.status(200).json(allEvents);
//     } else {
//       allEvents = await Event.paginate(
//         {},
//         { page, limit, sort: { createdAt: -1 } }
//       );
//       const upcomingEvents = allEvents?.docs?.filter(
//         (event) => new Date(event.date) > currentDate
//       );
//       const pastEvents = allEvents?.docs?.filter(
//         (event) => new Date(event.date) <= currentDate
//       );

//       // Paginate past events
//       const paginatedPastEvents = pastEvents.slice(
//         (page - 1) * limit,
//         page * limit
//       );

//       res.status(200).json({
//         upcomingEvents,
//         pastEvents: paginatedPastEvents,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const getAllEvent = async (req, res) => {
  try {
    const { limit, offset } = req.query;

    // Fetch upcoming events
    const upcomingEvents = await Event.find({ date: { $gte: new Date() } })
      .sort({ date: 1 }) // Sort by ascending date
      // .skip(parseInt(offset))
      .limit(parseInt(limit) * 8);

    // Fetch past events
    const pastEvents = await Event.find({ date: { $lt: new Date() } })
      .sort({ date: -1 }) // Sort by descending date
      // .skip(parseInt(offset))
      .limit(parseInt(limit) * 8);

    // Combine and send the response
    res.json({
      upcomingEvents,
      pastEvents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingleEvent = async (req, res) => {
  console.log(req.params.id);
  try {
    const event = await Event.findOne({ _id: req.params.id });
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleNewEvent, getAllEvent, getSingleEvent };
