import 'zone.js'
import 'reflect-metadata'

import { enableProdMode } from "@angular/core";

import * as express from 'express'
import { join } from "path";

enableProdMode()

const app = express()
const PORT = process.env.PORT || 8000
const DIST_FOLDER = join(process.cwd(), 'dist')

const { AppServerModuleNgFactory, LAZY_MODULE_APP } = require('./dist/server/main')

import { ngExpressEngine } from "@nguniversal/express-engine";

import { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_APP)
    ]
}))

app.set('view engine', 'html')
app.set('views', join(DIST_FOLDER, 'browser'))

import { GlobalConfig } from "./src/app/configs/global-config";
const buttercms = require('buttercms')(GlobalConfig.BUTTERCMS_API_TOKEN)

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')))

app.use('/post/:slug', (req, res) => {
    buttercms.post.retrieve(req.params.slug)
        .then((result) => {
            res.locals.result = result
            res.render('200', {req, res})
        })
})

app.get('*', (req, res) => {
    res.render('200', {req, res})
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
