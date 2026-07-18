import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, name
      FROM public.category;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryDetails = async (id) => {
    const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.name
        FROM category AS c
        INNER JOIN service_project_category AS spc
            ON c.category_id = spc.category_id
        WHERE spc.project_id = $1;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date,
            sp.organization_id
        FROM service_project AS sp
        INNER JOIN service_project_category AS spc
            ON sp.project_id = spc.project_id
        WHERE spc.category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

export {getAllCategories, getCategoryDetails, getCategoriesByProjectId, getProjectsByCategoryId};