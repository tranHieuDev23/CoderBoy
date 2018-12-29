import * as express from "express"
import { GlobalConfig } from "../src/app/configs/global-config";

const router = express.Router()
const ButterService = require('buttercms')(GlobalConfig.BUTTERCMS_API_TOKEN)

function archiveMiddleware (req, res) {
    let type = req.params.type
    if (type != 'category' && type != 'tag' && type != 'author') {
        return res.render('index', {req, res, url: '/404'})
    }
    let slug = req.params.slug
    let currentPage = (req.params.page != null? +req.params.page : 1)
    const REQUEST_PARAMS: any = {
        page: currentPage,
        page_size: GlobalConfig.ARCHIVE_PAGE_SIZE
    }
    if (type == 'category')
        REQUEST_PARAMS.category_slug = slug
    if (type == 'tag')
        REQUEST_PARAMS.tag_slug = slug
    if (type == 'author')
        REQUEST_PARAMS.author_slug = slug

    let metaPromise = ButterService[type].retrieve(slug)
    let postsPromise = ButterService.post.list(REQUEST_PARAMS)

    Promise.all([metaPromise, postsPromise]).then((result) => {
        res.locals.data = {resultMeta: result[0], resultPosts: result[1], type, slug, currentPage}
        return res.render('index', {req, res})
    }, (err) => {
        res.locals.status = '404'
        return res.render('index', {req, res})
    })
}

router.get('/archive/:type/:slug', archiveMiddleware)
router.get('/archive/:type/:slug/:page', archiveMiddleware)

export = router