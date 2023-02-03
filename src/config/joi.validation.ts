import * as Joi from 'joi';

// This function create environment variables if they don't exist in the .env file and to user it in the ConfigModule
export const JoiValidationSchema = Joi.object({
    STATE: Joi.required().default('prod'),
    PORT: Joi.required().default(3000),
    EMAIL: Joi.required(),
    EPASSWORD: Joi.required(),
    EMAILTO: Joi.required(),
    MONGODB: Joi.required(),
    JWT_SECRET: Joi.required(),
    HOST_API: Joi.required(),
    CLOUDINARY_CLOUD_NAME: Joi.required(),
    CLOUDINARY_API_KEY: Joi.required(),
    CLOUDINARY_API_SECRET: Joi.required(),
})