import fs from 'fs'
import http from 'http'
import path from 'path'
import React from 'react'
import { createRequire } from 'module'
import type { Renderer } from 'takumi-js/node'
import { jobImages } from '../gatsby/og/jobs'
import { createTakumiRenderer, fitRoleFontSize, renderOgJpeg } from '../gatsby/og/takumi'

const require = createRequire(__filename)
const port = Number(process.env.OG_DEV_PORT || 4180)
const ogDir = path.resolve(__dirname, '../src/templates/OG')
const jobModule = path.join(ogDir, 'job.tsx')
const watchedModules = [jobModule, path.join(ogDir, 'window.tsx')]

const loadJobOg = () => {
    for (const key of Object.keys(require.cache)) {
        if (key.includes(`${path.sep}templates${path.sep}OG${path.sep}`)) delete require.cache[key]
    }
    return require(jobModule).JobOg
}

const page = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Job OG</title>
  <style>
    body { margin: 24px; background: #111; color: #eee; font: 14px/1.4 system-ui, sans-serif; }
    form { display: flex; gap: 12px; align-items: end; margin-bottom: 16px; flex-wrap: wrap; }
    label { display: flex; flex-direction: column; gap: 4px; }
    input { font: inherit; padding: 6px 8px; min-width: 220px; }
    img { width: 1200px; height: 630px; background: #c5d1ab; }
  </style>
</head>
<body>
  <form>
    <label>Role <input name="role" value="Product Engineer" /></label>
    <label>Timezone <input name="timezone" value="GMT+2 to GMT-8" /></label>
    <label>Salary <input name="salary" value="$142K–$259K" /></label>
  </form>
  <img id="card" alt="Job Open Graph preview" />
  <script>
    const fields = ["role", "timezone", "salary"]
    const img = document.getElementById("card")
    const src = () => {
      const params = new URLSearchParams()
      for (const field of fields) params.set(field, document.querySelector('[name="' + field + '"]').value)
      return "/preview.jpeg?" + params
    }
    img.src = src()
    for (const field of fields) {
      document.querySelector('[name="' + field + '"]').addEventListener("input", () => {
        img.src = src() + "&t=" + Date.now()
      })
    }
    let seen = ""
    setInterval(async () => {
      const next = await fetch("/mtime").then((res) => res.text())
      if (seen && next !== seen) img.src = src() + "&t=" + next
      seen = next
    }, 300)
  </script>
</body>
</html>`

const main = async () => {
    const renderer: Renderer = await createTakumiRenderer()

    const server = http.createServer(async (req, res) => {
        const url = new URL(req.url || '/', `http://127.0.0.1:${port}`)
        try {
            if (url.pathname === '/mtime') {
                res.writeHead(200, { 'content-type': 'text/plain', 'cache-control': 'no-store' })
                res.end(String(Math.max(...watchedModules.map((file) => fs.statSync(file).mtimeMs))))
                return
            }
            if (url.pathname === '/preview.jpeg') {
                const JobOg = loadJobOg()
                const role = url.searchParams.get('role') || 'Product Engineer'
                const bytes = await renderOgJpeg(
                    renderer,
                    <JobOg
                        role={role}
                        roleFontSize={await fitRoleFontSize(renderer, role)}
                        timezone={url.searchParams.get('timezone') || undefined}
                        salary={url.searchParams.get('salary') || undefined}
                    />,
                    jobImages
                )
                res.writeHead(200, { 'content-type': 'image/jpeg', 'cache-control': 'no-store' })
                res.end(bytes)
                return
            }
            res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
            res.end(page)
        } catch (error) {
            console.error(error)
            res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
            res.end(error instanceof Error ? error.stack : String(error))
        }
    })

    server.listen(port, () => {
        console.log(`Job OG preview at http://127.0.0.1:${port}`)
    })
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
