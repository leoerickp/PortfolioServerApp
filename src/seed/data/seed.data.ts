export const USERS = [
    {
        fullName: 'Leo Erick Pereyra Rodriguez',
        email: 'leoerickp@gmail.com',
        password: '123456',
        roles: ['admin', 'superUser', 'user'],
        isActive: true
    },
    {
        fullName: 'Erick Pereyra',
        email: 'erick@google.com',
        password: '123456',
        roles: ['user'],
        isActive: true
    },
    {
        fullName: 'Fabiana kosky',
        email: 'koskky@google.com',
        password: '123456',
        roles: ['user'],
        isActive: false
    },
]

export const ROLES = [
    { roleName: 'Developer' },
    { roleName: 'Arquitect' },
    { roleName: 'Leader' }
];
export const BACKEND_SKILLS = [
    {
        id: 1,
        technology: 'Node.js',
        selfRate: 5,
        amountPrjs: 6,
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg',
        knowledges: [
            'Creation API REST',
            'ExpressJs',
            'Designer and creator of front end components',
            'Binding data between components to a database',
            'Handling of event elements',
            'Development of REST components',
            'Sequelize for Databases MySQL'
        ]
    },
    {
        id: 2,
        technology: 'PHP',
        selfRate: 5,
        amountPrjs: 10,
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/php-1.svg',
        knowledges: [
            'Back end developer',
            'Binding data between components to a database',
            'Handling of event elements',
            'Database design and implementer',
            'Database design',
            'Creation of MVC controllers',
            'Creation of database models with Laminas PHP'
        ]
    },
    {
        id: 3,
        technology: 'Laravel',
        selfRate: 4,
        amountPrjs: 3,
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/laravel-2.svg',
        knowledges: [
            'System auth for users',
            'Facebook and Google OAuth Integration',
            'Events and Logs handlings',
            'Creation of Eloquents models and relationships ',
            'Security middlewares for validation of authenticated users',
            'HTTP requests with the Guzzle client',
            'SQL Server - Microsoft Dynamics Integration',
            'Creation of commands and schedule tasks with Artisan',
            'Administrative interface for entity management',
            'JWT Integration'
        ]
    },
    {
        id: 4,
        technology: 'Symfony',
        selfRate: 1,
        amountPrjs: 1,
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/symfony.svg',
        knowledges: [
            'System auth for users',
            'Events and Logs handlings',
            'Creation of Doctrine models and relationships',
            'ElasticSearch 5.6 integration',
            'Http Request with Ajax',
            'Twig templates creation',
            'Creation of commands and schedules tasks',
            'Send emails with Sendmailer',
            'Twig templates with custom filters'
        ]
    }
];

export const FRONTEND_SKILLS = [
    {
        id: 1,
        technology: 'JavaScript',
        selfRate: 5,
        amountPrjs: 3,
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/logo-javascript.svg',
        knowledges: [
            'Development of interactives with clean code for easy replication',
            'Creation of SPA while handling internal states',
            'Fetching and displaying data',
            'Form validation and input sanitization',
            'HTTP requests with async/await, axios and fetch API',
            'React.js'
        ]
    },
    {
        id: 2,
        technology: 'TypeScript',
        selfRate: 4,
        amountPrjs: 3,
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/typescript.svg',
        knowledges: [
            'Development of interactives with clean code for easy replication',
            'Creation of SPA while handling internal states',
            'Form validation and input sanitization',
            'HTTP requests with async/await, axios and fetch API'
        ]
    },
    {
        id: 3,
        technology: 'React.js',
        selfRate: 4,
        amountPrjs: 3,
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
        knowledges: [
            'Developing React on version 18',
            'Data binding between components using propTypes',
            'Handling event’s elements',
            'Integration with REST services',
            'React hooks',
            'React custom hooks',
            'React router'
        ]
    },
    {
        id: 4,
        technology: 'Bootstrap',
        selfRate: 3,
        amountPrjs: 4,
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/bootstrap-5-1.svg',
        knowledges: [
            'CSS Frameworks like Webpack, Bootstrap',
            'Building of custom frontend frameworks and style Guides based on Bootstrap'
        ]
    }
];

export const OTHER_SKILL = [
    {
        id: 1,
        name: 'Jira',
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/jira-1.svg'
    },
    {
        id: 2,
        name: 'Figma',
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/figma-1.svg'
    },
    {
        id: 3,
        name: 'Wordpress',
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/wordpress-blue.svg'
    },
    {
        id: 4,
        name: 'GIT',
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/git-icon.svg'
    },
    {
        id: 5,
        name: 'GitHub',
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/github-icon.svg'
    },
    {
        id: 6,
        name: 'Photoshop',
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/adobe-photoshop-2.svg'
    },
];

export const DBENGINES = [
    {
        id: 1,
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/mysql-3.svg',
        name: 'MySQL',
        knowledges: [
            'Manipulation of data with the most common commands: SELECT, INSERT, UPDATE, DELETE',
            'Create new databases with the most common commands: CREATE, DROP, ALTER'
        ]
    },
    {
        id: 2,
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/microsoft-sql-server-1.svg',
        name: 'SQL server',
        knowledges: [
            'Querys',
            'Store procedures',
            'Functions',
            'Views',
            'Jobs'
        ]
    },
    {
        id: 3,
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/postgresql.svg',
        name: 'Postgresql',
        knowledges: [
            'Manipulation of data with the most common commands: SELECT, INSERT, UPDATE, DELETE',
            'Create new databases with the most common commands: CREATE, DROP, ALTER',
        ]
    },
    {
        id: 4,
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg',
        name: 'MongoDB',
        knowledges: [
            'Design database',
            'Non-sql queries',
            'Backup and restores',
            'Migrate data From mysql to MongoDb'
        ]
    },
    {
        id: 5,
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/oracle-6.svg',
        name: 'Oracle',
        knowledges: [
            'Data queries'
        ]
    },
    {
        id: 6,
        imgUrl: 'https://cdn.worldvectorlogo.com/logos/json-5.svg',
        name: 'JSON',
        knowledges: [
            'XML',
            'Transfer of data from Web to App'
        ]
    },
];

export const EXPERIENCES = [
    {
        id: 1,
        company: 'Military School of Engineering – EMI',
        positions: [
            {
                id: 1,
                position: 'Professor of the Systems Engineering career',
                date: 'January, 2022 – December, 2022',
                achievements: [
                    'Teacher of the following subjects: Software Development Seminar, Data Bases and Research Methodology.'
                ],
                stack: 'Laravel, PHP, NodeJs, ReactJs, Research Methodology, Project Development, Agile Methodologies.'
            }
        ]

    },
    {
        id: 2,
        company: 'National Meteorology and Hydrology Service – SENAMHI',
        positions: [
            {
                id: 1,
                position: 'Technical Coordinator #1',
                date: 'July, 2020 – October, 2021',
                achievements: [
                    'Improved the registration and distribution of internal institutional documentation by 100%, implementing RESTful API technology within an intranet.',
                    'Automated the production of climate prediction by 60%, developing algorithms to calculate climate indices for drought prediction.'
                ],
                stack: 'Language R, R studio, ReactJS, Angular, NodeJS, Bootstrap y MySQL.'
            },
            {
                id: 2,
                position: 'Head of Planning Unit #2',
                date: 'January, 2016 – October, 2021',
                achievements: [
                    'Coordinated a regional group of developers from Colombia, Ecuador, Peru and Bolivia, applying Scrum and agile methodologies.',
                    'Implemented a hydrometeorological data processing and interoperability platform in Colombia, Ecuador, Peru and Bolivia, applying a multi-platform distributed model.',
                    'Improved the publication of weather forecasts by 80%, geolocating the information on the institutional website, improving the users visual experience.',
                ],
                stack: 'ReactJS, Angular, NodeJS ,API REST, PHP, OpenLayer, JavaScript, JQuery, VueJS, MySQL, PostgreSQL, MSSQL y Oracle.'
            },
            {
                id: 3,
                position: 'Systems Manager #3',
                date: 'August, 2012 – December, 2015',
                achievements: [
                    'Automated the operation and management of fixed assets by 60%, integrating the modules of inventories, administration and operation of institutional activities.',
                    'Improved the management and information of human resources by 80%, in accordance with the government guidelines for the administration of human resources in the country.',
                    'Automated the production and publication of weather forecast and alert by 30%, providing dynamic interaction features with WMS and WFS services.',
                    'Provided maintenance to 80% of the institutional website, improving the user experience with interactive menus.',
                    'Promoted the publication of 100% specialized geospatial information, implementing Spatial Data Infrastructures (IDE).',
                    'Facilitated access to information to 60 remote offices, configuring Virtual Private Networks (VPN) and implementing transactional exchange of textual and multimedia data.',
                    'Improved the IT infrastructure by 80%, installing at least 5 servers for the deployment of specific computer applications, applying operating systems and database managers.',
                    'Made available results of WRF – MM5 meteorological models, installing and configuring a cluster of 5 servers under a Linux distribution.',
                ],
                stack: 'API REST, PHP, JavaScript, JQuery, GeoNode, GeoServer, GeoNetwork, PostgreSQL, PostGIS, MSSQL, MySQL, PostgreSQL, Windows Server 2008, Linux: Centos, Red Hat, Ubuntu.'
            },
        ]
    },
    {
        id: 3,
        company: 'Agencia Española de Cooperación Internacional para el Desarrollo – AECID, Proyecto MP 1717/09',
        positions: [
            {
                id: 1,
                position: 'Systems Engineer',
                date: 'January, 2010 – May, 2011',
                achievements: [
                    'Improved the production of weather forecast and alert information, publishing forecasts and alerts geolocated on the institutional website.',
                    'Automated the download and production of high resolution GOES 12 satellite image animations, daily processing 2880 images corresponding to the Visible, Water Vapor and Infrared channels of Bolivia and South America, coming from NOAA.',
                    'Enabled interoperability across 60 remote offices, exchanging satellite images, weather data and attached documents within Virtual Private Networks (VPN).'
                ],
                stack: 'Tech Stack: PHP, API REST, JavaScript, JQuery, Laravel, VueJS, MSSQL.'
            }
        ]

    },
];

export const PROJECTS = [
    {
        id: 1,
        project: 'Chachis Software',
        company: 'Personal',
        date: 2022,
        role: 'Developer, Architect',
        technologies: 'PHP, Laravel, MySQL',
        summary: 'Web application for managing sales of fast food in a restaurant, selecting an specific menu, suppliers, inventory and other things more.'
    },
    {
        id: 2,
        project: 'Git Commit Client',
        company: 'Personal',
        date: 2022,
        role: 'Developer, Architect',
        technologies: 'React, Git',
        summary: 'This website is intended for a technical test that demonstrates React knowledge.It makes requests to an API server.'
    },
    {
        id: 3,
        project: 'Git Commit Sever',
        company: 'Personal',
        date: 2022,
        role: 'Developer, Architect',
        technologies: 'NestJS, Git',
        summary: 'API Server is intended for a technical test demonstrating Restful API knowledge using Nest.It makes requests to a Git Hub API server, retrieving commits from a specific repository, selecting and reducing the information provided by the Git Hub API.'
    },
    {
        id: 4,
        project: 'Chatting Server',
        company: 'Personal',
        date: 2022,
        role: 'Developer, Architect',
        technologies: 'NodeJS',
        summary: 'It is a chatting server for sending publics and privates messages to auth users, using sockets.'
    },
    {
        id: 5,
        project: 'Distribution tickets for client attention',
        company: 'Personal',
        date: 2022,
        role: 'Developer, Architect',
        technologies: 'NodeJS, React',
        summary: 'It is a distribution tickets for client attention in a bank, using sockets.'
    },
    {
        id: 6,
        project: 'Personal Blog Web Application',
        company: 'Personal',
        date: 2022,
        role: 'Developer, Architect',
        technologies: 'React, Angular, VueJS, MongoDB',
        summary: 'Web application for publishing content from auth users, using databases NoSQL and different FrontEnd Technologies as a practice.'
    },
    {
        id: 7,
        project: 'Registration and distribution of internal institutional documentation',
        company: 'SENAMHI',
        date: 2021,
        role: 'Developer',
        technologies: 'NodeJs, React, MongoDB, Bootstrap',
        summary: 'Web application for registration and distribution of internal institutional documentation, implementing RESTful API technology within an intranet.'
    },
    {
        id: 8,
        project: 'Climate indices for drought prediction',
        company: 'SENAMHI',
        date: 2020,
        role: 'Developer',
        technologies: 'Language R, R studio, React',
        summary: 'Automatization of the production of climate prediction, developing algorithms to calculate climate indices for drought prediction.'
    },
    {
        id: 9,
        project: 'Publication of weather forecasts',
        company: 'SENAMHI',
        date: 2018,
        role: 'Developer, Architect, Leader',
        technologies: 'PHP, API REST, OpenLayer, JavaScript, JQuery, React y MSSQL',
        summary: 'Publication of weather forecasts, geolocating the information on the institutional website, improving the user &#39;s visual experience.'
    },
    {
        id: 10,
        project: 'Management and information of human resources',
        company: 'SENAMHI',
        date: 2018,
        role: 'Developer, Architect, Leader',
        technologies: 'API REST, PHP, JavaScript, MSSQL',
        summary: 'Web application for the management and information of human resources, in accordance with the government guidelines for the administration of human resources in the country.'
    },
    {
        id: 11,
        project: 'Hydrometeorological data processing and interoperability platform in Colombia, Ecuador, Peru and Bolivia',
        company: 'PRASDES Project - SENAMHI',
        date: 2016,
        role: 'Developer, Architect, Leader',
        technologies: 'API REST, OpenLayer, JavaScript, JQuery, VueJS, MySQL, PostgreSQL, MSSQL and Oracle',
        summary: 'Hydrometeorological data processing and interoperability platform for meteorological institutes in Colombia, Ecuador, Peru and Bolivia, applying a multi - platform distributed model and API Restful over different technical infrastructure.'
    },
    {
        id: 12,
        project: 'Operation and management of fixed assets',
        company: 'SENAMHI',
        date: 2015,
        role: 'Developer, Architect, Leader',
        technologies: 'PHP, JavaScript, JQuery, MSSQL',
        summary: 'Web application for the operation and management of fixed assets, integrating the modules of inventories, administration and operation of institutional activities.'
    },
    {
        id: 13,
        project: 'Management and information of human resources',
        company: 'SENAMHI',
        date: 2015,
        role: 'Developer, Architect',
        technologies: 'PHP, JavaScript, JQuery, MSSQL',
        summary: 'Web application for the management and information of human resources, in accordance with the government guidelines for the administration of human resources in the country.'
    },
    {
        id: 14,
        project: 'Production and publication of weather forecast and alert',
        company: 'SENAMHI',
        date: 2014,
        role: 'Developer, Architect',
        technologies: 'PHP, JavaScript, JQuery, MSSQL',
        summary: 'Web application for the production and publication of weather forecast and alert, providing dynamic interaction features with WMS and WFS services.'
    },
    {
        id: 15,
        project: 'Production and publication of weather forecast and alert',
        company: 'SENAMHI',
        date: 2014,
        role: 'Developer, Architect',
        technologies: 'PHP, JavaScript, OpenLayer, Geonode, GeoServer, JQuery, MSSQL',
        summary: 'Web application for publication specialized geospatial information, implementing Spatial Data Infrastructures(IDE).'
    },
    {
        id: 16,
        project: 'Production and publication of weather forecast and alert',
        company: 'SENAMHI',
        date: 2012,
        role: 'Developer, Architect',
        technologies: 'PHP, JavaScript, OpenLayer, Geonode, GeoServer, JQuery, MSSQL',
        summary: 'Web application for the production of weather forecast and alert information, publishing forecasts and alerts geolocated on the institutional website.'
    },
    {
        id: 17,
        project: 'Download and production of high resolution GOES 12 satellite image animations',
        company: 'SENAMHI - AECID, Project MP 1717 / 09',
        date: 2011,
        role: 'Developer, Architect',
        technologies: 'PHP, JavaScript, OpenLayer, Geonode, GeoServer, JQuery, MSSQL',
        summary: 'Web application for the download and production of high resolution GOES 12 satellite image animations, daily processing corresponding to the Visible, Water Vapor and Infrared channels of Bolivia and South America, coming from NOAA.'
    },
    {
        id: 18,
        project: 'Exchanging satellite images, weather data and attached documents within Virtual Private Networks(VPN)',
        company: 'SENAMHI - AECID, Project MP 1717 / 09',
        date: 2010,
        role: 'Developer, Architect',
        technologies: 'Delphi, PHP, API REST, MSSQL',
        summary: 'Software for interoperability across 60 remote offices, exchanging satellite images, weather data and attached documents within Virtual Private Networks(VPN).'
    }
];

export const PHOTOS = [
    {
        id: 1,
        imgUrl: 'https://scontent.flpb2-1.fna.fbcdn.net/v/t31.18172-8/14257639_10210765710882965_723022091111096676_o.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=TCtTaVznYsIAX8aJ9xD&_nc_ht=scontent.flpb2-1.fna&oh=00_AfA4as_FdgXNfu97vYd7X6Bv2F6eq8Ix_CxqyeiBo-sywA&oe=63B84030'
    },
    {
        id: 2,
        imgUrl: 'https://scontent.flpb2-1.fna.fbcdn.net/v/t31.18172-8/14305286_10210851759114117_4889975319742585822_o.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=WBYruHZ7kXkAX_m1MiB&_nc_ht=scontent.flpb2-1.fna&oh=00_AfDfoxCTenUbdsMa0NBGC-UU7Sl54nyDcefE84XDmEkG5g&oe=63B83758'
    },
    {
        id: 3,
        imgUrl: 'https://scontent.flpb2-1.fna.fbcdn.net/v/t31.18172-8/13123294_10209699261822405_408934232078911324_o.jpg?_nc_cat=101&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=ztrV2q83iyIAX_Mw5zF&_nc_ht=scontent.flpb2-1.fna&oh=00_AfCJUNqJBhGlbWbkqqoPfkUnVWc-5dTOe6yz50uM4A9grQ&oe=63B81C23'
    },
    {
        id: 4,
        imgUrl: 'https://scontent.flpb2-1.fna.fbcdn.net/v/t31.18172-8/11011635_10207885872208798_1790776289887932789_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=UZGDS0-tsyIAX_32Acw&_nc_ht=scontent.flpb2-1.fna&oh=00_AfDHzm7VIcv_rykA6Vz96tcTF7mF0Z72qTrO5-9Et4_XhQ&oe=63B8361A'
    },
    {
        id: 5,
        imgUrl: 'https://scontent.flpb2-1.fna.fbcdn.net/v/t1.18169-9/1461057_10202706339563719_195212153_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=cz7z1QCMZpoAX8v6t4q&_nc_ht=scontent.flpb2-1.fna&oh=00_AfD97WfEzFSDyvJrcp_EW76NLFVqCgqjh4vrgxXQ6-VDWg&oe=63B83AD2'
    }
];

export const PROFILE = {
    name: "Leo Erick Pereyra Rodriguez",
    birthDate: "1975-08-01T04:00:00.000Z",
    englishLevel: "Upper Intermediate (B2)",
    email: "leoerickp@gmail.com",
    cellphone: "+59172873363",
    githubRepository: "https://github.com/leoerickp",
    linkedIn: "https://www.linkedin.com/in/leoerickp/",
    city: "La Paz",
    aboutMe: {
        en: "I am a Fullstack Developer and Scrum Master with more than 10 years of experience developing BackEnd and FrontEnd solutions with frameworks such as ReactJs, NodeJS, Angular, VueJS and MSSQL, MySQL and PostgreSQL databases, leading projects through agile Scrum, Design Thinking and Kanban methodologies. My goal is to contribute to the development of IT solutions on a global scale, leading dynamic and high-performance teams, promoting research, technological development and corporate growth.",
        es: null
    },
    facebook: "https://www.facebook.com/leoerickp"
}