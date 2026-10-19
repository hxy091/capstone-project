import asyncHandler from 'express-async-handler';
import Project from '../models/Project.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).populate('user', 'username');
  res.json(projects);
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('user', 'username');
  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { title, description, imageUrl, repoUrl, liveUrl } = req.body;

  const project = await Project.create({
    title,
    description,
    imageUrl,
    repoUrl,
    liveUrl,
    user: req.user._id,
  });

  res.status(201).json(project);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.imageUrl = req.body.imageUrl || project.imageUrl;
    project.repoUrl = req.body.repoUrl || project.repoUrl;
    project.liveUrl = req.body.liveUrl || project.liveUrl;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

export { getProjects, getProjectById, createProject, updateProject, deleteProject };
