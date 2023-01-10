// This function checks evironment variables if they have some value or not
export const EnvConfiguration = () => ({
    environment: process.env.STATE || 'prod',
    mongodb: process.env.MONGODB,
    port: +process.env.PORT || 3000,
    defaultLimit: +process.env.DEFAULT_LIMIT || 10,
    email: process.env.EMAIL,
    emailPassword: process.env.EPASSWORD,
    emailTo: process.env.EMAILTO,
    jwtSecret: process.env.JWT_SECRET,
})