import * as express from "express"
import { GlobalConfig } from "../src/app/configs/global-config";

const router = express.Router()
const ButterService = require('buttercms')(GlobalConfig.BUTTERCMS_API_TOKEN)

function homeMiddleware(req, res) {
    let categoryPromise = ButterService.category.list()
    let postsPromise = ButterService.post.list({
        page: 1,
        page_size: GlobalConfig.CAROUSEL_PAGES,
        exclude_body: true
    })

    Promise.all([categoryPromise, postsPromise]).then((result) => {
        res.locals.data = {resultCategories: result[0], resultPosts: result[1]}
        return res.render('index', {req, res})
    }, (err) => {
        console.error(err)
        return res.render('index', {req, res})
    })
}

router.get('/', homeMiddleware)
router.get('/home', homeMiddleware)

export = router