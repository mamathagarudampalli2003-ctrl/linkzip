import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {

throw new Error(
"JWT_SECRET is missing in .env file"
);

}

export const JWT_SECRET =
process.env.JWT_SECRET;

export const JWT_EXPIRES =
"7d";