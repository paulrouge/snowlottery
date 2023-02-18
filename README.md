# my nextjs web3 template

Uses tailwind, typescript and ethers.js to connect to metamask / hana.

## GlobalContext
In utils/context/GlobalContext.tsx you can find the global context. The global context is provided
in _app.tsx and can be used in any component.

## Index.tsx | important!
pages/index.tsx is where the global logic regarding the connection to metamask / hana is handled.
It checks if:
- the connected device is a mobile device and if so, if it the hana or metamask app.
- if not mobile, is hana or metamask installed? If so, connect to on of them.

On connecting the users pick is stored in the localStorage. When creating a provider and
signer, the localStorage is checked to see it it should use window.ethereum or window.hanaWallet.

## Custom Fonts
To import a custom font you have to import it at _document.tsx and add it to the font array in the
in the tailwind config file.

## Custom Theme
To add a custom theme you have to add it to the tailwind config file.

