import { Router } from "express";

import { create, list } from "../../controllers/payroll";
import { checkJwt } from "../../middleware/checkJwt";
import { checkRole } from "../../middleware/checkRole";

const router = Router();

// by date range or 1 month
router.get(
  "/",
  [
    checkJwt,
    checkRole(["ADMINISTRATOR", "STANDARD", "MANAGER", "STAFF"], true),
  ],
  list
);

router.post(
  "/",
  [checkJwt, checkRole(["ADMINISTRATOR", "MANAGER"], true)],
  create
);

export default router;
