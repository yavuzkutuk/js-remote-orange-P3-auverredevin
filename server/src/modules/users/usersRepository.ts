import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface User {
  user_id: number;
  firstname: string;
  lastname: string;
  login: string;
  date_of_birth: string | null;
  email: string;
  password: string;
  phone: string | null;
  address: string | null;
  creation_date: string;
  modification_date: string;
  isAdmin: boolean;
  admin_id: number | null;
  role_id: number;
  last_update: string;
  token: string;
}

class UsersRepository {
  async create(user: Omit<User, "user_id" | "last_update">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (firstname, lastname, login, date_of_birth, email, password, phone, address, creation_date, modification_date, isAdmin, role_id, admin_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user.firstname,
        user.lastname,
        user.login,
        user.date_of_birth,
        user.email,
        user.password,
        user.phone,
        user.address,
        user.creation_date,
        user.modification_date,
        user.isAdmin,
        user.role_id,
        user.admin_id,
      ],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE user_id = ?",
      [id],
    );

    return rows[0] as User;
  }

  async checkuser(login: string, password: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE login = ? AND password = ?",
      [login, password],
    );

    return rows[0] as User;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM user");
    return rows as User[];
  }

  async update(user: User) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET firstname = ?, lastname = ?, login = ?, date_of_birth = ?, email = ?, password = ?, phone = ?, address = ?, creation_date = ?, modification_date = ?, isAdmin = ?, role_id = ?, admin_id = ? WHERE user_id = ?",
      [
        user.firstname,
        user.lastname,
        user.login,
        user.date_of_birth,
        user.email,
        user.password,
        user.phone,
        user.address,
        user.creation_date,
        user.modification_date,
        user.isAdmin,
        user.role_id,
        user.admin_id,
        user.user_id,
      ],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user WHERE user_id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new UsersRepository();
