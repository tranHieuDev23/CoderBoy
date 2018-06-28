import * as express from "express"
import { GlobalConfig } from "../src/app/configs/global-config";

const router = express.Router()
const ButterService = require('buttercms')(GlobalConfig.BUTTERCMS_API_TOKEN)

router.get('/about', (req, res) => {
    ButterService.author.list()
    .then((result) => {
        res.locals.result = result
        return res.render('200', {req, res})
    }, (result) => {
        return res.render('200', {req, res})
    })
})

export = router