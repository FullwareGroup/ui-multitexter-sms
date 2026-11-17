// No-ops where the Popover API is missing (Chrome < 114, Safari < 17,
// Firefox < 125). Callers also toggle `hidden` and position the panel `fixed`
// so it still works there.
const supported = () => 'popover' in HTMLElement.prototype

export function openPopover(el: HTMLElement) {
  if (supported() && !el.matches(':popover-open')) el.showPopover()
}

export function closePopover(el: HTMLElement) {
  if (supported() && el.matches(':popover-open')) el.hidePopover()
}

export function fixedOffset(el: HTMLElement) {
  if (supported()) return { x: 0, y: 0, bottom: 0 }
  const { left, top, bottom } = el.style
  Object.assign(el.style, { left: '0px', top: '0px', bottom: 'auto' })
  const start = el.getBoundingClientRect()
  Object.assign(el.style, { top: 'auto', bottom: '0px' })
  const end = el.getBoundingClientRect()
  Object.assign(el.style, { left, top, bottom })
  return {
    x: start.left,
    y: start.top,
    bottom: document.documentElement.clientHeight - end.bottom,
  }
}
