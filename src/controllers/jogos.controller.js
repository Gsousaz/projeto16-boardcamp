import db from "../database/database.connection.js";

export async function listarJogos(req, res) {
  try {
    const games = await db.query("SELECT * FROM games;");
    res.status(200).send(games.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function inserirJogo(req, res) {
  try {
    const { name, image, stockTotal, pricePerDay } = req.body;
    const game = await db.query(
      `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`,
      [name, image, stockTotal, pricePerDay]
    );
    res.status(200).send(game);
  } catch (err) {
    console.log("Ocorreu um erro ao acessar o servidor", err);
  }
}
