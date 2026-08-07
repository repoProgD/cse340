import db from './db.js'

const getAllProjects = async () => {
    const query = `
    SELECT 
        service_project.project_id,
        service_project.title,
        service_project.description,
        service_project.location,
        service_project.date,
        organization.name AS organization_name
    FROM public.service_project
    JOIN public.organization
    ON service_project.organization_id = organization.organization_id;
`;

    const result = await db.query(query);

    return result.rows;
}


const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY date;
      `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

/* Create a new function getUpcomingProjects(number_of_projects) 
that will retrieve the next number_of_projects upcoming service projects from the database. */

const getUpcomingProjects = async (numberOfProjects) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM service_project AS sp
        INNER JOIN organization AS o
            ON sp.organization_id = o.organization_id
        WHERE sp.date > CURRENT_DATE
        ORDER BY sp.date ASC
        LIMIT $1;
    `;

    const result = await db.query(query, [numberOfProjects]);

    return result.rows;
};


/* Create a new function getProjectDetails(id) that will retrieve a single service project by its ID. */

const getProjectDetails = async (id) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM service_project AS sp
        INNER JOIN organization AS o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO service_project (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async (
    projectId, organizationId, title, description, location, date) => {
    const query = `
        UPDATE service_project
        SET
            organization_id = $1,
            title = $2,
            description = $3,
            location = $4,
            date = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const queryParams = [ organizationId, title, description, location, date, projectId ];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error("Project not found");
    }

    if (process.env.ENABLE_SQL_LOGGING === "true") {
        console.log("Updated project with ID:", projectId);
    }

    return result.rows[0].project_id;
};

const addVolunteerToProject = async (projectId, volunteerId) => {
    const query = `
        INSERT INTO service_project_volunteer (project_id, volunteer_id)
        VALUES ($1, $2)
        RETURNING project_id, volunteer_id;
    `;

    const result = await db.query(query, [projectId, volunteerId]);

    return result.rows[0];
};

const createVolunteer = async (userId) => {
    const query = `
        INSERT INTO volunteer (user_id)
        VALUES ($1)
        RETURNING volunteer_id;
    `;

    const result = await db.query(query, [userId]);

    return result.rows[0];
};


const removeVolunteerFromProject = async (projectId, volunteerId) => {
    const query = `
        DELETE FROM service_project_volunteer
        WHERE project_id = $1
        AND volunteer_id = $2;
    `;

    await db.query(query, [projectId, volunteerId]);
};

const isUserVolunteer = async (projectId, userId) => {
    const query = `
        SELECT 1
        FROM service_project_volunteer spv
        JOIN volunteer v
            ON spv.volunteer_id = v.volunteer_id
        WHERE spv.project_id = $1
        AND v.user_id = $2;
    `;

    const result = await db.query(query, [projectId, userId]);

    return result.rows.length > 0;
};

const getVolunteerByUserId = async (userId) => {
    const query = `
        SELECT volunteer_id
        FROM volunteer
        WHERE user_id = $1;
    `;

    const result = await db.query(query, [userId]);

    return result.rows[0];
};


const getProjectsByUserId = async (userId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title
        FROM service_project sp
        JOIN service_project_volunteer spv
            ON sp.project_id = spv.project_id
        JOIN volunteer v
            ON spv.volunteer_id = v.volunteer_id
        WHERE v.user_id = $1
        ORDER BY sp.date;
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
};


// Export the model functions
export {
    getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails,
    createProject, addVolunteerToProject, removeVolunteerFromProject, isUserVolunteer,
    getVolunteerByUserId, createVolunteer, getProjectsByUserId
};
