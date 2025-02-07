import databaseClient from "../../../database/client";

import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";

type Result = ResultSetHeader;
type Rows = RowDataPacket[];

type Suggestion = {
  suggestion_id: number;
  name: string;
  price: number;
  origin: string;
  description: string;
  creation_date: string;
  modification_date: string;
};

class SuggestionRepository {
  // The C of CRUD - Create operation

  async create(suggestion: Omit<Suggestion, "suggestion_id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO suggestion (name, price, origin, description, creation_date, modification_date) VALUES ( ?, ?, ?, ?, ?, ?)",
      [
        suggestion.name,
        suggestion.price,
        suggestion.origin,
        suggestion.description,
        suggestion.creation_date,
        suggestion.modification_date,
      ],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM suggestion WHERE suggestion_id = ?",
      [id],
    );

    return rows[0] as Suggestion;
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM suggestion");

    return rows as Suggestion[];
  }

  // The U of CRUD - Update operation

  async update(suggestion: Suggestion) {
    await databaseClient.query<Result>(
      "UPDATE suggestion SET name = ?, price = ?, origin = ?, description = ?, modification_date = ? WHERE suggestion_id = ?",
      [
        suggestion.name,
        suggestion.price,
        suggestion.origin,
        suggestion.description,
        suggestion.modification_date,
        suggestion.suggestion_id,
      ],
    );
  }
  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user WHERE user_id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new SuggestionRepository();
