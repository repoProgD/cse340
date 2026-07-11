DROP TABLE IF EXISTS service_project_category;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS public.service_project; /* First, drop the child table */
DROP TABLE IF EXISTS public.organization;

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES public.organization(organization_id)
        ON DELETE CASCADE
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE service_project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);


-- Insert sample data


INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES (
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),



(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),

(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);


-- ============================================================
-- Sample data: service_project
-- ============================================================

INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    date
)
VALUES

-- ============================================================
-- BrightFuture Builders (organization_id = 1)
-- ============================================================

(
    1,
    'Community Center Renovation',
    'Renovation project to improve a local community center through sustainable construction practices.',
    'Springfield Community Center',
    '2026-08-15'
),

(
    1,
    'Neighborhood Playground Repair',
    'Volunteers will repair and improve playground equipment in a public neighborhood park.',
    'Riverside Park',
    '2026-09-05'
),

(
    1,
    'Affordable Housing Construction',
    'Construction assistance project focused on creating affordable housing solutions.',
    'Oak Street District',
    '2026-10-12'
),

(
    1,
    'School Building Improvements',
    'Maintenance and improvement work for a local school facility.',
    'Lincoln Elementary School',
    '2026-11-01'
),

(
    1,
    'Green Infrastructure Project',
    'Installation of environmentally friendly infrastructure in community spaces.',
    'Downtown Community Area',
    '2026-12-10'
),


-- ============================================================
-- GreenHarvest Growers (organization_id = 2)
-- ============================================================

(
    2,
    'Urban Garden Workshop',
    'Educational workshop teaching residents how to grow sustainable urban gardens.',
    'Central City Garden',
    '2026-08-20'
),

(
    2,
    'Community Vegetable Harvest',
    'Volunteers will collect and distribute fresh vegetables to local families.',
    'GreenHarvest Farm',
    '2026-09-18'
),

(
    2,
    'School Garden Installation',
    'Creation of educational gardens in local schools to promote sustainability.',
    'Washington Middle School',
    '2026-10-08'
),

(
    2,
    'Composting Education Program',
    'Community program focused on teaching composting and waste reduction methods.',
    'Neighborhood Learning Center',
    '2026-11-15'
),

(
    2,
    'Local Food Sustainability Fair',
    'Event promoting sustainable agriculture and healthy food practices.',
    'City Public Square',
    '2026-12-05'
),


-- ============================================================
-- UnityServe Volunteers (organization_id = 3)
-- ============================================================

(
    3,
    'Food Donation Drive',
    'Volunteer project collecting and distributing food donations to families in need.',
    'Unity Community Hall',
    '2026-08-25'
),

(
    3,
    'Senior Support Program',
    'Volunteers provide assistance and companionship to senior community members.',
    'Sunrise Senior Center',
    '2026-09-22'
),

(
    3,
    'Community Cleanup Day',
    'Neighborhood cleanup event organized by local volunteers.',
    'Maple Street Neighborhood',
    '2026-10-17'
),

(
    3,
    'Educational Tutoring Program',
    'Volunteer tutoring sessions supporting students in the community.',
    'Unity Learning Center',
    '2026-11-20'
),

(
    3,
    'Holiday Charity Event',
    'Seasonal charity event providing support and resources to local families.',
    'Unity Community Hall',
    '2026-12-18'
);


-- ============================================================
-- Sample data: category
-- ============================================================

INSERT INTO category (name)
VALUES
    ('Community Development'),
    ('Education'),
    ('Environmental Sustainability'),
    ('Food Security'),
    ('Social Support');

-- ============================================================
-- Sample data: service_project_category (intermediate table for many-to-many relationship)
-- ============================================================

INSERT INTO service_project_category (project_id, category_id)
VALUES
    -- Community Center Renovation
    (1, 1),

    -- Neighborhood Playground Repair
    (2, 1),

    -- Affordable Housing Construction
    (3, 1),
    (3, 5),

    -- School Building Improvements
    (4, 1),
    (4, 2),

    -- Green Infrastructure Project
    (5, 3),

    -- Urban Garden Workshop
    (6, 2),
    (6, 3),

    -- Community Vegetable Harvest
    (7, 3),
    (7, 4),

    -- School Garden Installation
    (8, 2),
    (8, 3),

    -- Composting Education Program
    (9, 2),
    (9, 3),

    -- Local Food Sustainability Fair
    (10, 3),
    (10, 4),

    -- Food Donation Drive
    (11, 4),
    (11, 5),

    -- Senior Support Program
    (12, 5),

    -- Community Cleanup Day
    (13, 1),
    (13, 3),

    -- Educational Tutoring Program
    (14, 2),

    -- Holiday Charity Event
    (15, 5);



/*SELECT * FROM service_project;*/