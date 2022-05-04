# AdTracker

## Install

1. Copy the root directory to your machine
1. Follow the instructions here to side-load the extension:

    https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading

    (Instructions are for Edge, but similar steps work for Chrome)

## Usage
Visit any page displaying Google Ads and open the web inspector
- Ad requests are logged to the console as they are resolved
- The most useful properties are surfaced at the top level
- Further details are available in sub-objects labelled "other"

```js
"ad-1": {...},
"ad-2": {...},
"ad-3": {
  prev_iu_szs: "320x50",
  prev_scp: "format=stacked&image=hidden&pos=native",
  us_privacy: "1---",
  cust_params: {
      device_spoor_id: "e644be6d-cd8d-4ca6-9711-78a0b40a51f6",
      guid: "63c4feab-5de0-4eff-8742-f8a07f8e19d7",
      loggedIn: "true",
      permutive: "...",
      other: {...}
  },
  other: {...}
}
```

## TODO
- [ ] Constrain inspection to FT.com pages
- [ ] Tie requests back to the slots that triggered them
- [ ] Support copying parsed values to the clipboard
