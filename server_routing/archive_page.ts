import * as express from "express"
import { GlobalConfig } from "../src/app/configs/global-config";

const router = express.Router()
const ButterService = require('buttercms')(GlobalConfig.BUTTERCMS_API_TOKEN)

function archiveMiddleware (req, res) {
    let type = req.params.type
    if (type != 'category' && type != 'tag' && type != 'author') {
        return res.render('200', {req, res, url: '/404'})
    }

    let slug = req.params.slug
    let currentPage = (req.params.page != null? +req.params.page : 1)

    ButterService[type].retrieve(slug)
    .then((resultMeta) => {
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

      ButterService.post.list(REQUEST_PARAMS)
        .then((resultPosts) => {
            res.locals.data = {resultMeta, resultPosts, type, slug, currentPage}
            return res.render('200', {req, res})
        }, () => {
            res.locals.status = '404'
            return res.render('200', {req, res})
        })
    }, () => {
        res.locals.status = '404'
        return res.render('200', {req, res})
    })
}

router.get('/archive/:type/:slug', archiveMiddleware)
router.get('/archive/:type/:slug/:page', archiveMiddleware)

export = router