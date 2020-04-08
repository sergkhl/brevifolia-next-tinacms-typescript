import express from 'express'
import next from 'next'
import * as apiGit from '@tinacms/api-git'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev,
  dir: './src',
})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(function (_req, res, next) {
    res.set('Access-Control-Allow-Origin', '*')
    res.set(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
  server.use(
    '/___tina',
    apiGit.router(<any>{
      pathToRepo: process.cwd(),
      pathToContent: '',
    })
  )

  server.all('*', (req: any, res: any) => {
    return handle(req, res)
  })

  server.listen(port, (err: any) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
