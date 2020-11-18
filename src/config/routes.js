import { Router} from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthContronller';
import ckeckCredendtials from '../middlewares/ckeckCredendtials';
import RecoveryController from '../controllers/RecoveryController';

const routes = new Router;

routes.get('/users',UserController.index)
      .post('/users',UserController.create)
      .post('/auth',AuthController.store);

routes.post('/recovery',RecoveryController.store)
      .put('/recovery',RecoveryController.update);

routes.use(ckeckCredendtials)
      .get('/auth',UserController.show)
      .put('/users/:id',UserController.update)
      .delete('/users/:id',UserController.SoftDelete)
      .delete('/users/:id',UserController.destroy);

export default routes;      
