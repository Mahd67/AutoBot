// routes/chatRoutes.js

import express from "express";
import { getaccessoriesdata, getpartsdata, saveNewOrder} from "../Services/marketController.js"
import { get } from "http";

const router = express.Router();

router.post('/createorder', saveNewOrder);

router.get('/getaccessories',getaccessoriesdata);

router.get('/getparts',getpartsdata);

//router.post('/getHistoryOne',getReportdataOne);

export default router;
