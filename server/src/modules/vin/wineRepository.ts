import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type wine = {
  id: number;
  title: string;
  user_id: number;
};

class wineRepository {
  // The C of CRUD - Create operation

  async create(wine: Omit<wine, "id">) {
    // Execute the SQL INSERT query to add a new wine to the "wine" table
    const [result] = await databaseClient.query<Result>(
      "insert into wine (title, user_id) values (?, ?)",
      [wine.title, wine.user_id],
    );

    // Return the ID of the newly inserted wine
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific wine by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from wine where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the wine
    return rows[0] as wine;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all wines from the "wine" table
    const [rows] = await databaseClient.query<Rows>("select * from wine");

    // Return the array of wines
    return rows as wine[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing wine

  // async update(wine: wine) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an wine by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new wineRepository();
