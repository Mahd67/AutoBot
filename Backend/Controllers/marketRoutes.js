// routes/chatRoutes.js

import express from "express";
import { getaccessoriesdata, getpartsdata, saveNewOrder, getcarcaredata} from "../Services/marketController.js"
import { get } from "http";

const router = express.Router();

router.post('/createorder', saveNewOrder);

router.get('/getaccessories',getaccessoriesdata);

router.get('/getparts',getpartsdata);

router.get('/getcarcareproducts',getcarcaredata);

//router.post('/getHistoryOne',getReportdataOne);

export default router;
