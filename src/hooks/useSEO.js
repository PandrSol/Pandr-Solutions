import { useEffect } from 'react'

const SITE_URL = 'https://pandrsol.com'
const DEFAULT_OG = `${SITE_URL}/og-image.jpg`

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [_, key, val] = selector.match(/\[(\w+)="([^"]+)"\]/) || []
    if (key && val) el.setAttribute(key, val)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function useSEO({ title, description, path = '/', image = DEFAULT_OG }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    if (title) document.title = title
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
      setMeta('meta[name="twitter:description"]', 'content', description)
    }
    if (title) {
      setMeta('meta[property="og:title"]', 'content', title)
      setMeta('meta[name="twitter:title"]', 'content', title)
    }
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[name="twitter:url"]', 'content', url)
    setMeta('meta[property="og:image"]', 'content', image)
    setMeta('meta[name="twitter:image"]', 'content', image)
    setLink('canonical', url)
  }, [title, description, path, image])
}
