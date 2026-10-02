import database from "@/infra/database.js";
import { ValidationError } from "@/infra/errors.js";

async function create(userInputValues) {
  await validateUniqueEmail(userInputValues.email);
  await validateUniqueUsername(userInputValues.username);

  const createdUser = await runInsertQuery(userInputValues);
  return createdUser;

  async function validateUniqueEmail(email) {
    const result = await database.query({
      text: `
        SELECT 
          email
        FROM 
          users
        WHERE  
          LOWER(email) = LOWER($1)
      `,
      values: [email],
    });

    if (result.rows.length > 0) {
      throw new ValidationError({
        message: "Email already exists",
        action: "Please use a different email",
      });
    }
  }

  async function validateUniqueUsername(username) {
    const result = await database.query({
      text: `
        SELECT 
          username
        FROM 
          users
        WHERE  
          LOWER(username) = LOWER($1)
      `,
      values: [username],
    });

    if (result.rows.length > 0) {
      throw new ValidationError({
        message: "Username already exists",
        action: "Please use a different username",
      });
    }
  }

  async function runInsertQuery(userInputValues) {
    const result = await database.query({
      text: `
        INSERT INTO 
          users (username, email, password) 
        VALUES 
          ($1, $2, $3)
        RETURNING 
          *
      `,
      values: [
        userInputValues.username,
        userInputValues.email,
        userInputValues.password,
      ],
    });

    return result.rows[0];
  }
}

export default {
  create,
};
