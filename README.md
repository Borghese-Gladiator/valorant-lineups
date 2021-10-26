# Valorant Lineups (Next.js + Chakra UI)
- Click environment on the right to view this app on Vercel
- Given map, agent, and attackDefense, this Next.js + Chakra UI app loads the corresponding images from the /public/ folder and displays them with their filename.

## Table of Contents
- [Technologies](#technologies)
- [Get Started](#get-started)
- [General Notes](#notes)
- [Screenshots Source](#screenshots-source)
- [Default Next.js README info](#readme-for-create-next-app)

## Technologies
- Next.js - React framework
- Chakra UI - styled React component library

## Get Started
Start with ```npm run dev``` at [http://localhost:3000](http://localhost:3000)
- /components/ - holds components used by pages
- /pages/ - each file is mapped to a route by Next.js (index.js is the home / route)
- /public/ - static files are served from the public folder by Next.js
- /api/ - maps each file to /api/* as endpoint
- To display lineup images, I display an image array given agent, map, attackDefense - ```pathsObject[agent][map][attackDefense]```
  - getStaticProps creates pathsObject at buildtime by recursively iterating through /public/img/lineups and creating keys for the folder name. 
  - Alternative was using an API, but that serves the files at runtime and lags more (and doesn't always work smoothly on Vercel)

#### References
- https://chakra-ui.com/docs/getting-started
- https://nextjs.org/docs/basic-features/data-fetching
- Related website is out of date - https://www.valorantcards.com/)

## Notes
- Vercel by default caches static files - https://vercel.com/docs/concepts/edge-network/caching#static-files
- Gave up on web design software - used CSS & Flex & [Google Fonts](https://fonts.google.com/) & [remove.bg](https://www.remove.bg) to create logo
  - I want to put a logo image next to a ~108px text with a custom font
  - Web Design software (Figma, Sketch, Invision) is SO BAD - it's actually a scam
    - Figma has a crappy UI, but basic text & font size changes are doable. The problem is with uploading a custom font, it requires a Figma Font service, but even when running, no interface appears whatsover.
    - Sketch requires a Mac OS download in addition to their web app
    - Invision is unable to add custom fonts
  - every app requires a sign up which I have come to expect (but still dislike)
  - Obligatory pro - they enable collaboration and focus on sharing of prototypes.

### Implementation Steps
- create-next-app
- npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
- npm i react-icons swr
- mkdir components
- write Header, Sidebar, RootLayout
- write GameForm with custom Chakra UI RadioCards
- write pathfinder API endpoint
- write up index.js to display list of images from calling pathfinder API endpoint
- Removed API - used getStaticProps to create object at BUILD TIME - script creates a pathsObject that maps given keys used for filtering (agent, map, attackDefense) to an array of image paths
- Moved all content to /src
- Rewrote to use React Context with GameDataContext (formerly passed all GameData from pages/index.js down to components)
- Added pattern to white background - https://css-tricks.com/css-background-patterns/
- Split image list by section using first prefix of filename (done at runtime)
- Rewrote to use a paths object that saves all images and their paths at build time
  - Use pathsObject to select images at runtime
- new feature to select by site, added SiteDataContext - ```(if attackDefense === 'attack') { setImgList(pathsObject[agent][map][attackDefense][siteData]) }```
- add new image content of Post Plant Lineups for each map (Ascent, Bind, Breeze, Fracture, Haven, Icebox, Split)

### Fixed Issues
- USE react-icons - @chakra-ui/icons has very few options
  - https://chakra-ui.com/docs/media-and-icons/icon
- USE getStaticProps - PRD problem - ```next build``` removes all unused images in /public when I need those images to be in /public so they can be displayed
  - wrote utils/build_script.js that saves the paths to all files in /public/img/lineups to an array which index.js loads as default image list (so none are unused)
  - SCRAPPED - check archive/index.js => used getStaticProps to fix
- Chakra UI Radio REQUIRES to use prop "value" as opposed to any other key like "name"

### Issue with Next.js + Material UI
There is poor integration between Next.js + Material UI (react component library)
- When running Next.js dev, Material UI is unable to load styles from ```useStyles``` which is core to working with Material UI
  - The existing workaround suggests to use the following link, but this DOES NOT work with ```@material-ui/core```
    - https://github.com/mui-org/material-ui/tree/master/examples/nextjs
  - I had 20~ commits to try and fix this but I gave up
    - Steps to Replicate
      - create-next-app and then add /components folder
      - wrote Material UI components like Navbar/Sidebar/GameForm
      - used these components in /pages
      - client styles DO NOT work with server styles
        - removing them like in the numerous Stack Overflow posts suggested did not work (the ones that removed jssStyles in useEffect)
        - removing everything and adding this "Next.js + Material UI example" did NOT WORK since example uses a DIFFERENT Material UI package
          - https://github.com/mui-org/material-ui/tree/master/examples/nextjs
          - Literally uses @mui when I'm using @material-ui/core and Stack Overflow suggests using this example to get Material UI working
      - To pass build, need to remove ESLINT from create-next-app
    - References for Material UI
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

## Screenshots Source
- Viper Lineups
  - Unidaro - https://www.youtube.com/channel/UCFWmMq1_tLA5Ymb3Qa20w7Q
    - great post plants
  - Brush - https://www.youtube.com/channel/UCJpFhHKBBbuTZ0X64RQt8cQ
    - great attacking smokes
  - SkillCapped - https://www.youtube.com/channel/UCre4LlH_zPpgeUVvBGCMqcA
    - about half were actually suboptimal and rewritten with Unidaro's lineups (don't remember which anymore)
  - FluxRevived - https://www.youtube.com/channel/UC5pOxttTGwCR5CpFS6KcZIw

# README for create-next-app
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
