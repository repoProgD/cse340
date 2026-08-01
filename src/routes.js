import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';

import {
    showProjectsPage, showProjectDetailsPage, showNewProjectForm,
    processNewProjectForm, projectValidation, showEditProjectForm,
    processEditProjectForm
} from './controllers/projects.js';

import {
    showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm,
    processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm,
    showEditCategoryForm, processEditCategoryForm, categoryValidation
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';
import {
    showUserRegistrationForm, processUserRegistrationForm, showLoginForm,
    processLoginForm, processLogout, requireLogin, showDashboard, requireRole,
    showUsers
} from './controllers/users.js';

const router = express.Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

// Routes for the details pages
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);

// Route for new organization page (protected route, admin only)
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

// Route to handle new organization form submission (protected route, admin only)
router.post(
    '/new-organization',
    requireRole('admin'),
    organizationValidation,
    processNewOrganizationForm
);

// Route to display the edit organization form (protected route, admin only)
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Route to handle the edit organization form submission (protected route, admin only)
router.post(
    '/edit-organization/:id',
    requireRole('admin'),
    organizationValidation,
    processEditOrganizationForm
);

// Route for new project page (protected route, admin only)
router.get('/new-project', requireRole('admin'), showNewProjectForm);

// Route to handle new project form submission (protected route, admin only)
router.post(
    '/new-project',
    requireRole('admin'),
    projectValidation,
    processNewProjectForm
);

// Routes to handle the assign categories to project form (protected routes, admin only)
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// Route to display the edit project form (protected route, admin only)
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);

// Route to handle the edit project form submission (protected route, admin only)
router.post(
    '/edit-project/:id',
    requireRole('admin'),
    projectValidation,
    processEditProjectForm
);

// Route for new category page (protected route, admin only)
router.get('/new-category', requireRole('admin'), showNewCategoryForm);

// Route to handle new category form submission (protected route, admin only)
router.post(
    '/new-category',
    requireRole('admin'),
    categoryValidation,
    processNewCategoryForm
);

// Route to display the edit category form (protected route, admin only)
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);

// Route to handle the edit category form submission (protected route, admin only)
router.post(
    '/edit-category/:id',
    requireRole('admin'),
    categoryValidation,
    processEditCategoryForm
);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Route to display the dashboard page (protected route)
router.get('/dashboard', requireLogin, showDashboard);

// Route to display the users page (protected route, admin only)
router.get('/users', requireRole('admin'), showUsers);

// error-handling routes
router.get('/test-error', testErrorPage, processNewOrganizationForm);

export default router;