import { addVitePlugin, defineNuxtModule } from 'nuxt/kit'
import postcss from 'postcss'
import type { Container, Declaration, Root } from 'postcss'

// Tailwind's fallback for classes like `bg-surface/70` bakes in the @theme colour, so browsers
// without color-mix() (Chrome < 111) ignore the .theme-brand and .dark overrides. This follows
// each color-mix() block with one for those browsers that reads the scoped colour from channel variables.

const COLOR_MIX_SUPPORTS =
  /^\(\s*color\s*:\s*color-mix\(\s*in\s+lab\s*,\s*red\s*,\s*red\s*\)\s*\)$/
const TOKEN_MIX =
  /^color-mix\(\s*in\s+oklab\s*,\s*var\(--color-([\w-]+)\)\s*([\d.]+)%\s*,\s*transparent\s*\)$/

function toChannels(value: string): [string, number] | null {
  const hex = value.match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i)?.[1]
  if (hex) {
    const full = hex.length <= 4 ? [...hex].map((c) => c + c).join('') : hex
    const [r, g, b, a = 255] = full.match(/../g)!.map((pair) => parseInt(pair, 16))
    return [`${r} ${g} ${b}`, Math.round((a / 255) * 1000) / 1000]
  }

  const rgb = value.match(
    /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[,/]\s*([\d.]+)(%?))?\s*\)$/i,
  )
  if (rgb) {
    const [, r, g, b, alpha = '1', percent] = rgb
    return [`${r} ${g} ${b}`, Number(alpha) / (percent ? 100 : 1)]
  }

  return null
}

function addChannelVariables(root: Root) {
  const declarations = new Map<string, Declaration[]>()
  root.walkDecls(/^--color-/, (decl) => {
    const token = decl.prop.slice('--color-'.length)
    declarations.set(token, [...(declarations.get(token) ?? []), decl])
  })

  const themed = new Set<string>()
  for (const [token, decls] of declarations) {
    if (decls.length < 2) continue
    const channels = decls.map((decl) => toChannels(decl.value.trim()))
    if (channels.some((channel) => !channel)) continue

    decls.forEach((decl, i) => {
      const [rgb, alpha] = channels[i]!
      decl.cloneAfter({ prop: `--fallback-${token}-alpha`, value: String(alpha) })
      decl.cloneAfter({ prop: `--fallback-${token}`, value: rgb })
    })
    themed.add(token)
  }
  return themed
}

function isEmpty(container: Container): boolean {
  container.each((node) => {
    if ((node.type === 'rule' || node.type === 'atrule') && isEmpty(node)) {
      node.remove()
    }
  })
  return !container.nodes?.length
}

function addFallbacks(css: string) {
  const root = postcss.parse(css)
  const themed = addChannelVariables(root)
  if (!themed.size) return null

  root.walkAtRules('supports', (supports) => {
    if (!COLOR_MIX_SUPPORTS.test(supports.params)) return

    const fallback = supports.clone({ params: `not ${supports.params}` })
    fallback.walkDecls((decl) => {
      const [, token, percent] = decl.value.match(TOKEN_MIX) ?? []
      if (token && themed.has(token)) {
        decl.value = `rgb(var(--fallback-${token}) / calc(var(--fallback-${token}-alpha) * ${Number(percent) / 100}))`
      } else {
        decl.remove()
      }
    })
    if (!isEmpty(fallback)) supports.after(fallback)
  })

  return root.toString()
}

export default defineNuxtModule({
  meta: { name: 'theme-color-fallback' },
  setup() {
    addVitePlugin({
      name: 'theme-color-fallback',
      enforce: 'pre',
      transform: {
        filter: {
          id: {
            include: /\.css(?:\?.*)?$/,
            exclude: /[?&](?:worker|sharedworker|raw|url)\b/,
          },
        },
        handler(code) {
          if (!code.includes('color-mix(in lab')) return
          const result = addFallbacks(code)
          return result ? { code: result, map: null } : undefined
        },
      },
    })
  },
})
