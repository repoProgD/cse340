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

// Export the model functions
export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };


 /* project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
        title VARCHAR(150) NOT NULL,
            description TEXT NOT NULL,
                location VARCHAR(255) NOT NULL,
                    date DATE NOT NULL, */