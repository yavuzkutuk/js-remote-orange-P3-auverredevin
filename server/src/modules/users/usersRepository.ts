import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface User {
  user_id: number;
  firstname: string;
  lastname: string;
  date_of_birth: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role_id: number;
}
class userRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<User, "user_id">) {
    const formattedDate = new Date(user.date_of_birth)
      .toISOString()
      .split("T")[0];
    const [result] = await databaseClient.query<Result>(
      "insert into user (firstname, lastname, date_of_birth, email, password, phone, address, role_id) values (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user.firstname,
        user.lastname,
        user.date_of_birth,
        user.email,
        user.password,
        user.phone,
        user.address,
        user.role_id,
      ],
    );

    // Return the ID of the newly inserted wine
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where user_id = ?",
      [id],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as User | null;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await databaseClient.query<Rows>("select * from user");

    // Return the array of users
    return rows as User[];
  }

  async update(user: User) {
    const formattedDate = new Date(user.date_of_birth)
      .toISOString()
      .split("T")[0];

    // Execute the SQL UPDATE query to update an existing user in the "user" table
    const [result] = await databaseClient.query<Result>(
      "update user set firstname = ?, lastname = ?, date_of_birth = ?, email = ?, password = ?, phone = ?, address = ?, role_id = ? where user_id = ?",
      [
        user.firstname,
        user.lastname,
        user.date_of_birth,
        user.email,
        user.password,
        user.phone,
        user.address,
        user.role_id,
        user.user_id,
      ],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  async delete(id: number) {
    // Supprimer d'abord les scores associés à l'utilisateur
    await databaseClient.query<Result>(
      "delete from user_scores where user_id = ?",
      [id],
    );

    // Ensuite, supprimer les réponses associées à l'utilisateur (si nécessaire)
    await databaseClient.query<Result>(
      "delete from user_answers where user_id = ?",
      [id],
    );

    // Enfin, supprimer l'utilisateur
    const [result] = await databaseClient.query<Result>(
      "delete from user where user_id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new userRepository();
