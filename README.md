## Valorant Lineups
Next.js project with Material UI to reference lineups during loading screen as quick reminders. (Related website is out of date - https://www.valorantcards.com/)

## Technologies
- Next.js - React framework
- Chakra UI - styled React component library

## References
- https://chakra-ui.com/docs/getting-started
- Viper Screenshot Content
  - https://www.youtube.com/watch?v=KBXw6rsnq-s
- https://nextjs.org/docs/basic-features/data-fetching

## Notes
- @chakra-ui/icons has very few options (use react-icons)
  - https://chakra-ui.com/docs/media-and-icons/icon
- PRD problem - ```next build``` removes all unused images in /public when I need those images to be in /public so they can be displayed
  - wrote utils/build_script.js that saves the paths to all files in /public/img/lineups to an array which index.js loads as default image list (so none are unused)
  - SCRAPPED - check archive/index.js => used getStaticProps to fix

#### Project Step by Step Process
- create-next-app
- npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
- npm i react-icons swr
- mkdir components
- write Header, Sidebar, RootLayout
- write GameForm with custom Chakra UI RadioCards
- write pathfinder API endpoint
- write up index.js to display list of images from calling pathfinder API endpoint
- Removed API - used getStaticProps to create object at BUILD TIME - script creates a pathsObject that maps given keys used for filtering (agent, map, attackDefense) to an array of image paths

#### Scrapped Next.js + Material UI
DO NOT USE Next.js with Material UI => I scrapped the commit history, but there was 20~ commits to try and fix styling and I give up.
- Next.js - React framework
- Material UI - styled React component library

#### Steps for above conclusion
- create-next-app and then add /components folder
- wrote Material UI components like Navbar/Sidebar/GameForm
- used these components in /pages
- client styles DO NOT work with server styles
  - removing them like in the numerous Stack Overflow posts suggested did not work (the ones that removed jssStyles in useEffect)
  - removing everything and adding this "Next.js + Material UI example" did NOT WORK since example uses a DIFFERENT Material UI package
    - https://github.com/mui-org/material-ui/tree/master/examples/nextjs
    - Literally uses @mui when I'm using @material-ui/core and Stack Overflow suggests using this example to get Material UI working
- To pass build, need to remove ESLINT from create-next-app

#### References
- Created layouts using past project and here
  - https://nextjs.org/docs/basic-features/layouts
  - https://github.com/Borghese-Gladiator/next-installer-site
- Added Next.js links wrapping Material UI ListItem & Links
  - https://stackoverflow.com/questions/66226576/using-the-material-ui-link-component-with-the-next-js-link-component
  - https://stackoverflow.com/questions/47206639/how-to-add-a-link-to-a-list-in-material-ui-1-0
- Fixed development SSR styling issue in Next.js
  - https://github.com/mui-org/material-ui/tree/master/examples/nextjs
  - https://material-ui.com/styles/advanced/#next-js
- Fixed "Failed to compile" next/document should not be imported outside of pages/_document.js when import is already present in _document.js
  - track bug here - https://github.com/vercel/next.js/issues/28596
  - solve temporarily by removing ESLint

# Next.js Default README
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
