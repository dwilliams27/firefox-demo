# Firefox iframe Popup Bug Demo

## URLs

- **Main page:** https://firefox-demo.fly.dev
- **Cross-origin iframe app:** https://firefox-demo-iframe.fly.dev

## Reproduce the bug

1. Open https://firefox-demo.fly.dev in Firefox IOS
2. Cross origin button will open new tab, but it will never redirect
3. Same origin button will open new tab, then redirect after a second

This behavior is not seen in Safari or Chrome on IOS, both redirect as expected for both cases.
