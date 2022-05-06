# AdTracker

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

### inspectSlots

A function called `inspectSlots` is also made available on the window. Invoking it parses the `data-o-ads-*` attributes on each slot:

```json
{
  "name": "article-native",
  "init": "true",
  "targeting": {
    "format": "stacked",
    "image": "hidden",
    "pos": "native"
  },
  "label": "true",
  "formats": {
    "default": ["false"],
    "extra": ["false"],
    "large": ["PartnerContent"],
    "medium": ["PartnerContent"],
    "small": ["PartnerContent"]
  }
}
```
Creating a bookmark with the address `javascript:inspectSlots()` will let you trigger it on demand

## Installation

1. Copy the root directory to your machine
1. Follow these [instructions for side-loading the extension](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading)
   (Instructions are for Edge, but similar steps work for Chrome)

## Development

1. Run `npm i`
2. Make any desired changes, then run `npm run build`
    (a watch mode is coming!)
3. Apply your updates by clicking the "reload" button in the extension's settings
    (you won't see any changes without doing this)

![Screenshot 2022-05-05 at 10 24 25](https://user-images.githubusercontent.com/21795/166896696-9e5e57f2-66ce-4404-b65d-1394d629e919.png)

## TODO

- [ ] Constrain inspection to FT.com pages
- [ ] Tie requests back to the slots that triggered them
- [ ] Support copying parsed values to the clipboard
