import type { RequestHandler } from "express";

// Import access to data
import wineRepository from "./wineRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all wines
    const wines = await wineRepository.readAll();

    // Respond with the wine in JSON format
    res.json(wines);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific wine based on the provided ID
    const wineId = Number(req.params.id);
    const wine = await wineRepository.read(wineId);

    // If the wine is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the wine in JSON format
    if (wine == null) {
      res.sendStatus(404);
    } else {
      res.json(wine);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the wine data from the request body
    const newwine = {
      title: req.body.title,
      user_id: req.body.user_id,
    };

    // Create the wine
    const insertId = await wineRepository.create(newwine);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted wine
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
