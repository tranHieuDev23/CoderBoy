import * as express from "express"
import { GlobalConfig } from "../src/app/configs/global-config";

const router = express.Router()
const ButterService = require('buttercms')(GlobalConfig.BUTTERCMS_API_TOKEN)

router.use('/post/:slug', (req, res) => {
    ButterService.post.retrieve(req.params.slug)
    .then((result) => {
        res.locals.result = result
        return res.render('index', {req, res})
    }, () => {
        res.locals.status = '404'
        return res.render('index', {req, res})
    })
})

export = router