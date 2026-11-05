// Workaround for a Next.js 16 static-export mismatch.
//
// The export writes route-segment payloads into nested folders, e.g.
//   out/pricing/__next.pricing/__PAGE__.txt
// but the client router requests flat, dot-joined names, e.g.
//   /pricing/__next.pricing.__PAGE__.txt
// Without the flat copies every prefetch 404s and client navigation has to fall back.
// This runs automatically after `npm run build` (npm "postbuild" hook).

import { copyFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const OUT = 'out'
let created = 0

function filesUnder(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? filesUnder(p) : [p]
  })
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (!statSync(p).isDirectory()) continue
    if (name.startsWith('__next.')) {
      for (const file of filesUnder(p)) {
        const flat = join(dir, `${name}.${relative(p, file).split(sep).join('.')}`)
        if (!existsSync(flat)) {
          copyFileSync(file, flat)
          created++
        }
      }
    } else if (name !== '_next') {
      walk(p)
    }
  }
}

if (!existsSync(OUT)) {
  console.error(`flatten-segments: "${OUT}" not found. Run next build first.`)
  process.exit(1)
}
walk(OUT)
console.log(`flatten-segments: created ${created} flat segment files`)
