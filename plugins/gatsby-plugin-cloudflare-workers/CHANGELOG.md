# Changelog

## [3.4.3](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v3.4.2...plugin-gatsby-v3.4.3) (2022-08-16)


### Bug Fixes

* **deps:** update dependency @netlify/functions to ^1.2.0 ([#482](https://github.com/netlify/netlify-plugin-gatsby/issues/482)) ([fc57682](https://github.com/netlify/netlify-plugin-gatsby/commit/fc57682370c337acdadb447ddfd366cc5085b8c3))

## [3.4.2](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v3.4.1...plugin-gatsby-v3.4.2) (2022-08-15)


### Bug Fixes

* **deps:** update dependency @netlify/functions to ^1.1.0 ([#475](https://github.com/netlify/netlify-plugin-gatsby/issues/475)) ([7697651](https://github.com/netlify/netlify-plugin-gatsby/commit/769765170a5c42ea563e9dfea96371f5e5cac2f0))
* **deps:** update dependency pathe to v0.3.4 ([#478](https://github.com/netlify/netlify-plugin-gatsby/issues/478)) ([4562be8](https://github.com/netlify/netlify-plugin-gatsby/commit/4562be8a89804eedc83728960fd02565ef2ea975))

## [3.4.1](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v3.4.0...plugin-gatsby-v3.4.1) (2022-08-01)


### Bug Fixes

* **deps:** update dependency pathe to v0.3.3 ([#426](https://github.com/netlify/netlify-plugin-gatsby/issues/426)) ([3d0597c](https://github.com/netlify/netlify-plugin-gatsby/commit/3d0597cd6a620d8fc359cb48a6a8bd2c75a85f87))

## [3.4.0](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v3.3.1...plugin-gatsby-v3.4.0) (2022-07-25)


### Features

* handle number and object responses correctly in functions ([#440](https://github.com/netlify/netlify-plugin-gatsby/issues/440)) ([2335f5e](https://github.com/netlify/netlify-plugin-gatsby/commit/2335f5e13729b01ba5055b27d6d49b1b1abdc857))

## [3.3.1](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v3.3.0...plugin-gatsby-v3.3.1) (2022-07-15)


### Bug Fixes

* add fs.promises to linked filesystem ([#441](https://github.com/netlify/netlify-plugin-gatsby/issues/441)) ([d5be3cc](https://github.com/netlify/netlify-plugin-gatsby/commit/d5be3ccb9f0b8f3ed2a70f4f4d53ce7807953df9))

## [3.3.0](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v3.2.5...plugin-gatsby-v3.3.0) (2022-07-13)


### Features

* do not pre-warm lambdas if DEPLOY_PRIME_URL is not set ([#435](https://github.com/netlify/netlify-plugin-gatsby/issues/435)) ([9c0e8ba](https://github.com/netlify/netlify-plugin-gatsby/commit/9c0e8ba38cc2e3666a880f5ae384c68ae17bd275))

## [3.2.5](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v3.2.4...plugin-gatsby-v3.2.5) (2022-07-11)


### Bug Fixes

* support scoped names for platform binary packages in lmdb ([#431](https://github.com/netlify/netlify-plugin-gatsby/issues/431)) ([a34b1aa](https://github.com/netlify/netlify-plugin-gatsby/commit/a34b1aa0cb5ed2bc9e6dd71137276d7bce156476))

## [3.2.4](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v3.2.3...plugin-gatsby-v3.2.4) (2022-06-24)


### Bug Fixes

* **deps:** update dependency @netlify/ipx to ^1.1.2 ([#413](https://github.com/netlify/netlify-plugin-gatsby/issues/413)) ([6838df8](https://github.com/netlify/netlify-plugin-gatsby/commit/6838df87f98b24da23819debe708491d1cd1ef1c))

## [3.2.3](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v3.2.2...plugin-gatsby-v3.2.3) (2022-06-23)


### Bug Fixes

* **deps:** update dependency @netlify/ipx to ^1.1.1 ([#410](https://github.com/netlify/netlify-plugin-gatsby/issues/410)) ([40dbcde](https://github.com/netlify/netlify-plugin-gatsby/commit/40dbcdea3cceeacbbfbd74aac481e9c89edffd99))

## [3.2.2](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v3.2.1...plugin-gatsby-v3.2.2) (2022-06-13)


### Bug Fixes

* **deps:** update dependency @netlify/ipx to ^1.1.0 ([#399](https://github.com/netlify/netlify-plugin-gatsby/issues/399)) ([8ae84c7](https://github.com/netlify/netlify-plugin-gatsby/commit/8ae84c73d3adebbd3f99acb15c78990bdd0d807a))

### [3.2.1](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v3.2.0...plugin-gatsby-v3.2.1) (2022-06-01)


### Bug Fixes

* add AbortController polyfill ([#391](https://github.com/netlify/netlify-plugin-gatsby/issues/391)) ([db412a2](https://github.com/netlify/netlify-plugin-gatsby/commit/db412a2b3089c031088bd87ba6f9a023e4fc2c0e))
* fix downloadUrl when downloading Gatsby datastore file from CDN ([#392](https://github.com/netlify/netlify-plugin-gatsby/issues/392)) ([b455188](https://github.com/netlify/netlify-plugin-gatsby/commit/b4551886e1a2d024213a5b9a27120fc170b50dc9))

## [3.2.0](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v3.1.0...plugin-gatsby-v3.2.0) (2022-05-30)


### Features

* Optionally load gatsby datastore in lambdas ([#376](https://github.com/netlify/netlify-plugin-gatsby/issues/376)) ([1c0fcea](https://github.com/netlify/netlify-plugin-gatsby/commit/1c0fcead459933ae1af3e9957d1bee9b150fb472))


### Bug Fixes

* **deps:** update dependency pathe to ^0.3.0 ([#370](https://github.com/netlify/netlify-plugin-gatsby/issues/370)) ([e283ff8](https://github.com/netlify/netlify-plugin-gatsby/commit/e283ff8cd1309328c5b51bec341f629472294043))

## [3.1.0](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v3.0.0...plugin-gatsby-v3.1.0) (2022-05-19)


### Features

* enable API, SSR and DSG functions individually as required ([#375](https://github.com/netlify/netlify-plugin-gatsby/issues/375)) ([aa36bc2](https://github.com/netlify/netlify-plugin-gatsby/commit/aa36bc230898a8a43aeaf6175173ef02256bc338))


### Bug Fixes

* **deps:** update dependency cookie to ^0.5.0 ([#356](https://github.com/netlify/netlify-plugin-gatsby/issues/356)) ([40f0f85](https://github.com/netlify/netlify-plugin-gatsby/commit/40f0f85616bf7cb91224936bca065304727b7d83))
* **deps:** update dependency fs-extra to v10.1.0 ([#357](https://github.com/netlify/netlify-plugin-gatsby/issues/357)) ([c0c9bfc](https://github.com/netlify/netlify-plugin-gatsby/commit/c0c9bfc00b8ffeca76b30afeb26f84d7506f6c52))
* **deps:** update dependency semver to v7.3.6 ([#347](https://github.com/netlify/netlify-plugin-gatsby/issues/347)) ([93d951b](https://github.com/netlify/netlify-plugin-gatsby/commit/93d951b5ab20f9cd0236aa596ede514676ad380c))
* **deps:** update dependency semver to v7.3.7 ([#354](https://github.com/netlify/netlify-plugin-gatsby/issues/354)) ([a3f9b23](https://github.com/netlify/netlify-plugin-gatsby/commit/a3f9b239f97d03f1acf8033b919b729e9310167c))

## [3.0.0](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v2.1.4...plugin-gatsby-v3.0.0) (2022-04-04)


### ⚠ BREAKING CHANGES

* remove catch-all DSG redirect and handle discretely (#334)

### Bug Fixes

* remove catch-all DSG redirect and handle discretely ([#334](https://github.com/netlify/netlify-plugin-gatsby/issues/334)) ([21773dd](https://github.com/netlify/netlify-plugin-gatsby/commit/21773ddd241b8f764104ef3841f55b43581cac03))

### [2.1.4](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v2.1.3...plugin-gatsby-v2.1.4) (2022-03-21)


### Bug Fixes

* resolve lmdb binaries correctly ([#327](https://github.com/netlify/netlify-plugin-gatsby/issues/327)) ([c6c162b](https://github.com/netlify/netlify-plugin-gatsby/commit/c6c162bc11b76cbe5ea63ff78f45f0f8dff626a5))

### [2.1.3](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v2.1.1...plugin-gatsby-v2.1.3) (2022-03-16)


### Bug Fixes

* **deps:** update dependency @netlify/ipx to ^1.0.1 ([#318](https://github.com/netlify/netlify-plugin-gatsby/issues/318)) ([f9e7a88](https://github.com/netlify/netlify-plugin-gatsby/commit/f9e7a8858ca91cbcd4572f5a9a403e1b602b4ba2))
* patch new lmdb binary location ([#322](https://github.com/netlify/netlify-plugin-gatsby/issues/322)) ([0abc3f9](https://github.com/netlify/netlify-plugin-gatsby/commit/0abc3f9492e56aa7070fb7c657046fcf873ac368))

### [2.1.1](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v2.1.0...plugin-gatsby-v2.1.1) (2022-03-02)


### Bug Fixes

* update image CDN docs and defaults ([#307](https://github.com/netlify/netlify-plugin-gatsby/issues/307)) ([0a7b223](https://github.com/netlify/netlify-plugin-gatsby/commit/0a7b223c4cf49b18261213b147d64c27ab60f9cd))

## [2.1.0](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v2.0.4...plugin-gatsby-v2.1.0) (2022-03-02)


### Features

* add support for `/_gatsby/file/*` redirects ([#305](https://github.com/netlify/netlify-plugin-gatsby/issues/305)) ([d071712](https://github.com/netlify/netlify-plugin-gatsby/commit/d07171265f41a527405a280e618934a3c243803e))
* image cdn support ([#303](https://github.com/netlify/netlify-plugin-gatsby/issues/303)) ([77b5aa4](https://github.com/netlify/netlify-plugin-gatsby/commit/77b5aa4a3b0e8d0ecbd6bf2935d4348324066ce0))


### Bug Fixes

* **deps:** update dependency fs-extra to v10.0.1 ([#299](https://github.com/netlify/netlify-plugin-gatsby/issues/299)) ([2e0c8fb](https://github.com/netlify/netlify-plugin-gatsby/commit/2e0c8fb116a6c9af19cbcb96d92f4cfb6963bf84))

### [2.0.4](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v2.0.3...plugin-gatsby-v2.0.4) (2022-02-23)


### Bug Fixes

* remove confusing error log ([#292](https://github.com/netlify/netlify-plugin-gatsby/issues/292)) ([ed5ab59](https://github.com/netlify/netlify-plugin-gatsby/commit/ed5ab59cc44ac6d5ac3a20524f96b0d61bcc35ac))

### [2.0.3](https://github.com/netlify/netlify-plugin-gatsby/compare/plugin-gatsby-v2.0.2...plugin-gatsby-v2.0.3) (2022-02-21)

### Bug Fixes

- **deps:** update dependency @netlify/functions to ^0.11.1
  ([#279](https://github.com/netlify/netlify-plugin-gatsby/issues/279))
  ([f2272b9](https://github.com/netlify/netlify-plugin-gatsby/commit/f2272b9033570038814b05a704a3504e4811f403))
- **deps:** update dependency @netlify/functions to v1
  ([#280](https://github.com/netlify/netlify-plugin-gatsby/issues/280))
  ([e9faecc](https://github.com/netlify/netlify-plugin-gatsby/commit/e9faecc79b24d5432409aa5dfbd3d19e15007901))
- **deps:** update dependency cookie to v0.4.2
  ([#263](https://github.com/netlify/netlify-plugin-gatsby/issues/263))
  ([d031e20](https://github.com/netlify/netlify-plugin-gatsby/commit/d031e201056847fed03c58c0710210dfd46d6fb5))
- support gatsby base dirs outside the site root
  ([#281](https://github.com/netlify/netlify-plugin-gatsby/issues/281))
  ([ccbec68](https://github.com/netlify/netlify-plugin-gatsby/commit/ccbec681bfce40598ca2a91945f29ee35b04603c))

## [2.0.0](https://github.com/netlify/netlify-plugin-gatsby/compare/v2.0.0-zz-beta.0...v2.0.0) (2022-01-31)

Version 2 of the Essential Gatsby build plugin adds support for the new render
modes introduced in Gatsby 4, as well as improved support for Gatsby functions.
For best results it should be installed alongside
[`gatsby-plugin-netlify`](https://github.com/netlify/gatsby-plugin-netlify/).
Beta support was available since Gatsby 4 was released, but with this stable
release it is ready for production use for everyone.

### Features

This version adds full support for the new Gatsby 4 render modes on Netlify.
Gatsby 4 introduced two render modes, alongside its original SSG mode. For a
detailed comparison of each mode
[see this blog post](https://www.netlify.com/blog/2021/09/16/run-gatsby-4-with-dsg-and-ssr-on-netlify-today/).

To support these new modes, the Essential Netlify build plugin generates three
serverless Netlify Functions that are automatically deployed alongside your
site:

- `__api`: used for Gatsby Functions
- `__dsg`: an
  [on-demand builder](https://docs.netlify.com/configure-builds/on-demand-builders/)
  used for DSG pages.
- `__ssr`: used for server-side rendered pages.

You do not need to configure or deploy these functions yourself: they are
automatically generated and deployed whenever you build.

You can see the logs for these functions in the "Functions" tabs in the Netlify
dashboard.

It will also generate Netlify rewrites to ensure that each route is handled by
the correct function.

### Installing

This version of the plugin will soon be installed automatically for all Gatsby
sites on Netlify. If you can't wait, you can
[install it manually](https://github.com/netlify/netlify-plugin-gatsby#installation)
using file-based plugin installation.

You should also install `gatsby-plugin-netlify` to enable all features. **It is
required if you are using SSR pages**. See
[how to install](https://github.com/netlify/netlify-plugin-gatsby#install-the-gatsby-plugin)

### Deploying your site

You do not need to do anything different to deploy your site if building on
Netlify: it will automatically deploy the functions when you build. If you are
deploying manually using the Netlify CLI, you must ensure that instead of
running `netlify build` then `netlify deploy` as separate commands, you run them
together as `netlify deploy --build`.

### Caveats

Currently you cannot use `StaticImage` or `gatsby-transformer-sharp` in SSR or
DSG pages. The best workaround is to use an image CDN such as
[Cloudinary](https://www.gatsbyjs.com/docs/how-to/images-and-media/using-cloudinary-image-service/)
or [imgix](https://github.com/imgix/gatsby) to host your images. This will give
you faster builds too.

### Feedback

If you have feedback or bug reports, join
[the discussion](https://github.com/netlify/netlify-plugin-gatsby/discussions)
or [open an issue](https://github.com/netlify/netlify-plugin-gatsby/issues)
