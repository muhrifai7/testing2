import { Router } from 'express';

import { list,create,show ,destroy,edit} from "../../controllers/salaries";
import { checkJwt } from '../../middleware/checkJwt';
import { checkRole } from '../../middleware/checkRole';
import { validatorEdit } from '../../middleware/validation/users';

const router = Router();

router.get('/',list);
// absence scan
router.post('/',[checkJwt, checkRole(['ADMINISTRATOR','MANAGER'], true)],create);

// [checkJwt, checkRole(['ADMINISTRATOR','MANAGER','STANDARD','STAFF'], true)]
router.get('/:id([0-9]+)', show);

router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true), validatorEdit], edit);

router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], destroy);

export default router;
