const Project = require('../model/Project');

// Create a new project
const handleNewProject = async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);

  const { title, content } = req.body;

  const image = req.file;

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
    const result = await Project.create({
      title: title,
      image: imageUrl,
      content: content,
      // github: github,
      // youtube: youtube,
      // website: website,
      // team: team,
    });
    console.log(req.body);
    return res
      .status(201)
      .json({ status: 'success', message: 'New Project is published' });
  } catch (error) {
    console.log(error);
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    let allProjects;
    if (req.query.page == 'all') {
      allProjects = await Project.find().sort({ createdAt: -1 });
      res.status(200).json(allProjects);
    } else {
      allProjects = await Project.paginate(
        {},
        { page, limit, sort: { createdAt: -1 } }
      );
      res.status(200).json(allProjects);
    }

    // Example Mongoose query to fetch notices in descending order
    // const allNotices = await Notice.find()
    //   .sort({ createdAt: -1 })
    //   .skip((page - 1) * limit)
    //   .limit(limit);
  } catch (error) {
    console.log(error);
  }
};

// Get a project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { handleNewProject, getAllProjects, getProjectById };
