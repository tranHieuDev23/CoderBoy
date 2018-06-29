import * as express from "express"
import { GlobalConfig } from "../src/app/configs/global-config";

const router = express.Router()
const ButterService = require('buttercms')(GlobalConfig.BUTTERCMS_API_TOKEN)

router.use('/search', (req, res) => {
    let query = req.query.query
    if (query) {
        ButterService.post.search(query, {
            page: 1,
            page_size: GlobalConfig.SEARCH_MAXIMUM_RESULTS
        })
        .then((result) => {
            res.locals.result = result
            return res.render('index', {req, res})
        }, () => {
            return res.render('index', {req, res})
        })
    }
})

export = router