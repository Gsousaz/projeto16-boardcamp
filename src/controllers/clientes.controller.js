import db from "../database/database.connection.js";
import dayjs from "dayjs";

export async function listarClientes(req, res) {
  try {
    const clientes = await db.query(`SELECT * FROM customers`);
    res.status(200).send(clientes.rows);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function buscarClienteId(req, res) {
  try {
    const id = req.params.id;
    const cliente = await db.query(`SELECT * FROM customers WHERE id = $1; `, [
      id,
    ]);

    if (cliente.rows.length === 0) {
      res.sendStatus(404);
    }
    res.status(200).send(cliente.rows[0]);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function inserirCliente(req, res) {
  try {
    const { name, phone, cpf, birthday } = req.body;

    const clientAlreadyExists = await db.query(
      `SELECT * FROM customers WHERE cpf = $1`,
      [cpf]
    );

    if (clientAlreadyExists.rows.length > 0)
      return res.status(409).send("CPF já cadastrado");

    await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, dayjs(birthday).format("YYYY-MM-DD")]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err);
  }
}

export async function atualizarCliente(req, res) {
  try {
    const id = req.params.id;
    const { name, phone, cpf, birthday } = req.body;
    const clientAlreadyExists = await db.query(
      `SELECT * FROM customers WHERE cpf = $1 AND id != $2`,
      [cpf, id]
    );
    if (clientAlreadyExists.rows.length > 0)
      return res.status(409).send("CPF já cadastrado");
    await db.query(
      `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`,
      [name, phone, cpf, dayjs(birthday).format("YYYY-MM-DD"), id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
}
