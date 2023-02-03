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
    hostAPI: process.env.HOST_API,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET
})