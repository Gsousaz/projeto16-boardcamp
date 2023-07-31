import dayjs from "dayjs";
import db from "../database/database.connection.js";

export async function listarAlugueis(req, res) {
  try {
    const query = `
      SELECT
        rentals.id,
        rentals."customerId",
        rentals."gameId",
        TO_CHAR(rentals."rentDate", 'YYYY-MM-DD') AS "rentDate",
        rentals."daysRented",
        TO_CHAR(rentals."returnDate", 'YYYY-MM-DD') AS "returnDate",
        rentals."originalPrice",
        rentals."delayFee",
        customers.id AS "customerId",
        customers.name AS "customerName",
        games.id AS "gameId",
        games.name AS "gameName"
      FROM rentals
      JOIN customers ON customers.id = rentals."customerId"
      JOIN games ON games.id = rentals."gameId";`;

    const alugueis = await db.query(query);

    const alugueisList = alugueis.rows.map((aluguel) => ({
      id: aluguel.id,
      customerId: aluguel.customerId,
      gameId: aluguel.gameId,
      rentDate: aluguel.rentDate,
      daysRented: aluguel.daysRented,
      returnDate: aluguel.returnDate,
      originalPrice: aluguel.originalPrice,
      delayFee: aluguel.delayFee,
      customer: {
        id: aluguel.customerId,
        name: aluguel.customerName,
      },
      game: {
        id: aluguel.gameId,
        name: aluguel.gameName,
      },
    }));

    res.send(alugueisList);
  } catch (error) {
    res.status(500).send({ error: "Erro ao listar aluguéis" });
  }
}

export async function inserirAluguel(req, res) {
  try {
    const rentDate = dayjs().format("YYYY-MM-DD");
    const { customerId, gameId, daysRented } = req.body;

    const customer = await db.query("SELECT * FROM customers WHERE id = $1", [
      customerId,
    ]);
    if (customer.rows.length === 0) {
      res.status(404).send("Cliente não encontrado");
    }

    const game = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
    if (game.rows.length === 0) {
      res.status(404).send("Jogo não encontrado");
      return;
    }

    await db.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee" ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        null,
        game.rows[0].pricePerDay * daysRented,
        null,
      ]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deletarAluguel(req, res) {
  try {
    const id = req.params.id;

    const aluguel = await db.query("SELECT * FROM rentals WHERE id = $1", [id]);
    if (aluguel.rows.length === 0) {
      return res.status(404).send("Aluguel não encontrado!");
    }

    if (aluguel.rows[0].returnDate === null) {
      return res.status(400).send("Aluguel não finalizado!");
    }

    await db.query("DELETE FROM rentals WHERE id = $1", [id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
