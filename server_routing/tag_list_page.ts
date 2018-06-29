import * as express from "express"
import { GlobalConfig } from "../src/app/configs/global-config";

const router = express.Router()
const ButterService = require('buttercms')(GlobalConfig.BUTTERCMS_API_TOKEN)

router.get('/tag', (req, res) => {
    ButterService.tag.list()
    .then((result) => {
        res.locals.result = result
        return res.render('index', {req, res})
    }, (res) => {
        return res.render('index', {req, res, url: '/404'})
    })
})

export = router