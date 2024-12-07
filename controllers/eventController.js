const Event = require("../model/Event");

exports.createEvent = async (req, res) => {
  try {
    // Destructure and validate the required fields
    const { title, content, registration, facebook, event_date } = req.body;
    const file = req.file;
    const thumbnail_url = file.destination + "/" + file.filename;
    if (
      !title ||
      !content ||
      !registration ||
      !facebook ||
      !event_date ||
      !thumbnail_url
    ) {
      return res.status(400).json({
        status: "error",
        message:
          "All fields (title, content, registration, facebook, event_date) are required",
      });
    }

    const formData = {
      title,
      content,
      registration,
      facebook,
      date: event_date,
      thumbnail_url,
    };

    const event = new Event(formData);
    const savedEvent = await event.save();
    res.status(201).json({ status: "success", data: savedEvent });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ status: "success", data: events });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res
        .status(404)
        .json({ status: "error", message: "Event not found" });
    }
    res.status(200).json({ status: "success", data: event });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
