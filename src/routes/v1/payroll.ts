import { Router } from "express";

import { create, list, show } from "../../controllers/payroll";
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

router.get(
  "/:id([0-9]+)",
  [
    checkJwt,
    checkRole(["ADMINISTRATOR", "STANDARD", "MANAGER", "STAFF"], true),
  ],
  show
);

router.post(
  "/",
  [checkJwt, checkRole(["ADMINISTRATOR", "MANAGER"], true)],
  create
);

export default router;
