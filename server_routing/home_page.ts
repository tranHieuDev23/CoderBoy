import * as express from "express"
import { GlobalConfig } from "../src/app/configs/global-config";

const router = express.Router()
const ButterService = require('buttercms')(GlobalConfig.BUTTERCMS_API_TOKEN)

function homeMiddleware(req, res) {
    ButterService.category.list()
    .then((resultCategories) => {
        ButterService.post.list({
            page: 1,
            page_size: GlobalConfig.CAROUSEL_PAGES,
            exclude_body: true
        }).then((resultPosts) => {
            res.locals.data = {resultCategories, resultPosts}
            return res.render('index', {req, res})
        }, () => {
            return res.render('index', {req, res})
        })
    }, () => {
        return res.render('index', {req, res})
    })
}

router.get('/', homeMiddleware)
router.get('/home', homeMiddleware)

export = router