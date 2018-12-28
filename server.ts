import 'zone.js'
import 'reflect-metadata'

import { enableProdMode } from "@angular/core";

import * as express from 'express'
import * as compression from "compression";
import { join } from "path";

enableProdMode()

const app = express()
const PORT = process.env.PORT || 8000
const DIST_FOLDER = join(process.cwd(), 'dist')

const { AppServerModuleNgFactory, LAZY_MODULE_APP } = require('./dist/server/main')

import { ngExpressEngine } from "@nguniversal/express-engine";

import { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=604800')
    next()
})
app.use(compression())
app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_APP)
    ]
}))

import { GlobalConfig } from "./src/app/configs/global-config";
const ButterService = require('buttercms')(GlobalConfig.BUTTERCMS_API_TOKEN)

app.get('/sitemap.xml', (req, res) => {
    ButterService.feed.retrieve('sitemap')
    .then((result) => {
        res.set('Content-Type', 'text/xml')
        res.end(result.data.data)
    }, (result) => {
        res.status(404).end('Nothing. There is no sitemap.')
    })
})

app.set('view engine', 'html')
app.set('views', join(DIST_FOLDER, 'browser'))
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')))

import * as aboutRoute from './server_routing/about_page'
import * as archiveRoute from './server_routing/archive_page'
import * as homeRoute from './server_routing/home_page'
import * as postRoute from './server_routing/post_page'
import * as searchRoute from './server_routing/search_page'
import * as tagListRoute from './server_routing/tag_list_page'

app.use(aboutRoute)
app.use(archiveRoute)
app.use(homeRoute)
app.use(postRoute)
app.use(searchRoute)
app.use(tagListRoute)

app.get('*', (req, res) => {
    res.render('index', {req, res})
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
