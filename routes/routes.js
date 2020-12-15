import { Router } from "../deps.js";
import * as Ctrlr from "./controllers/mainController.js";
import * as loginCtrlr from "./controllers/authController.js";
import * as reportCtrlr from "./controllers/reportController.js";
import * as sumCtrlr from "./controllers/summaryController.js";
import * as userCtrlr from "./controllers/userController.js";
import * as loginApi from "./apis/loginApi.js";

const router = new Router();

router.get('/', Ctrlr.index);
router.get('/home', Ctrlr.home);
router.get('/auth/login', userCtrlr.login);
router.post('/auth/login', loginCtrlr.authenticateUser);
router.get('/auth/registration', Ctrlr.register );
router.post('/auth/registration', userCtrlr.postRegistration );
router.get('/auth/logout', userCtrlr.logout);
router.get('/behavior/reporting', reportCtrlr.reporting);
router.get('/behavior/summary', sumCtrlr.summary);
router.get('/behavior/summary/week/:week', sumCtrlr.getDataDates);
router.get('/behavior/summary/month/:month', sumCtrlr.getDataMonth);
router.get('/behavior/reporting/morning', reportCtrlr.reporting);
router.post('/behavior/reporting/morning', reportCtrlr.morningReport );
router.get('/behavior/reporting/evening', reportCtrlr.reporting );
router.post('/behavior/reporting/evening', reportCtrlr.eveningReport );

export { router };