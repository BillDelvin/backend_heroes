const express = require("express");
const router = express.Router();
const heroesRouter = require("../controllers/Heroes");

router.post("/post", heroesRouter.createData);
router.get("/get", heroesRouter.getData);
router.get("/get/:heroesId", heroesRouter.getDataById);
router.delete("/delete/:heroesId", heroesRouter.deleteDataById);
router.put("/edit/:heroesId", heroesRouter.editDataById);

module.exports = router;
