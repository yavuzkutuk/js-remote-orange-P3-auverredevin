import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import tastingActions from "./modules/degustation/tastingActions";
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/users/usersActions";
import wineActions from "./modules/vin/wineActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/wines", wineActions.browse);
router.get("/api/wines/:id", wineActions.read);
router.post("/api/wines", wineActions.add);
router.put("/api/wines/:id", wineActions.edit);
router.delete("/api/wines/:id", wineActions.destroy);

router.get("/api/tastings", tastingActions.browse);
router.get("/api/tastings/:id", tastingActions.read);
router.post("/api/tastings", tastingActions.add);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", userActions.add);
router.put("/api/users/:id", userActions.edit);
router.delete("/api/users/:id", userActions.destroy);

import SignIn from "./modules/auth/auth";

router.post("/api/auth/signin", SignIn.SignIn);
router.post("/api/auth/signup", SignIn.SignUp);
router.get("/api/auth/check", SignIn.Check);

/* ************************************************************************* */

export default router;
