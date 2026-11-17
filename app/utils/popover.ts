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
