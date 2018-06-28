import * as express from "express"
import { GlobalConfig } from "../src/app/configs/global-config";

const router = express.Router()
const ButterService = require('buttercms')(GlobalConfig.BUTTERCMS_API_TOKEN)

function homeMiddleware(req, res) {
    ButterService.category.list()
    .then((result) => {
        res.locals.result = result
        return res.render('200', {req, res})
    }, (res) => {
        return res.render('200', {req, res, url: '/404'})
    })
}

router.get('/', homeMiddleware)
router.get('/home', homeMiddleware)

export = router