# Magic Site

> Front-end codebase serving [Magic Site](https://magic.link).

## Getting Started

### Node Version

The currently-used Node version is `14.17.x`.

To ease development between projects, [you can choose to install a Node version manager](https://www.notion.so/magiclabs/Node-js-Version-Management-a61f9aa8f16a466e86251e085ce46c92) (i.e.: [`nvm`](https://github.com/nvm-sh/nvm)) and use it to switch between Node versions on-the-fly.

Then, link a suitable Node version:

```zsh
nvm install 14.17 # only required the first time!
nvm use 14.17
```

### NPM Tokens

We sometimes rely on privately-published NPM packages to run our applications. For this reason, you'll need to generate a token with access to Magic's private packages. Follow [NPM documentation](https://docs.npmjs.com/creating-and-viewing-authentication-tokens) to learn about generating an access token.

Next, you'll need to assign your NPM token to an environment variable in your preferred shell.

```zsh
export NPM_TOKEN="00000000-0000-0000-0000-000000000000"
```

### Environment Setup

 1. First, download all dependencies using Yarn:

```zsh
yarn install
```

2. Then, you'll need to sign in with your Vercel account so we can link the project and download development-only environment variables. If you have not had a Vercel account provisioned reach out to [#it](https://fortmatic.slack.com/app_redirect?channel=it).

```zsh
yarn vercel:link
```
> You will be prompted to select a method to login to Vercel: <br />
- GitHub - if the primary email address (your.name@magic.link) for the GitHub account that you use to develop at Magic is the same as the email address that [#it](https://fortmatic.slack.com/app_redirect?channel=it) used to provision your Vercel account
- Email - if the primary email address for the GitHub account that you use to develop at Magic is linked to a non @magic.link email. This would be the case if you are using your personal GitHub account. After you login with your email you will need to add your GitHub account to your [Vercel Account by adding a Login Connection here](https://vercel.com/account/login-connections)

> Once you login using the method you selected you will be prompted to setup the site:
```zsh
Vercel CLI 23.1.2
? Set up “~/src/magic-site”? [Y/n] y
```

```
Which scope should contain your project? Magic Labs
? Found project “magiclabs/magic-site”. Link to it?
[Y/n] y
✅  Linked to magiclabs/magic-site (created .vercel)
✨  Done in 62.91s.
```
> 💭 Is the "Magic Labs" organization / scope missing from the list? This usually indicates missing permissions. Reach out to [#it](https://fortmatic.slack.com/app_redirect?channel=it) for help getting invited to Magic's Vercel account!

3. After successfully completing the previous command, you can download a development ENV file like so:

```zsh
yarn vercel:env
```

Great, you're almost there! 💪

See the next two sections for instructions on how to start developing locally. **You shouldn't have to repeat steps 2-3 above unless environment variables change.**

### Starting a Development Server

You can start serving a hot-reloading development server with the following command:

```zsh
yarn dev
```

### Starting a Production-ish Server

To replicate a production-like environment locally, use the following commands:

```zsh
yarn build
yarn start
```
