### Changelog


## [1.5.7](https://github.com/mattwebbio/orbital-sync/compare/v1.5.6...v1.5.7) (2024-02-01)


### Bug Fixes

* bump nodemailer from 6.9.8 to 6.9.9 ([6b57526](https://github.com/mattwebbio/orbital-sync/commit/6b575269f438808218ae80bda2b9e8d130166917))

## [1.5.5](https://github.com/mattwebbio/orbital-sync/compare/v1.5.4...v1.5.5) (2024-02-01)

### Bug Fixes

* bump node-fetch from 3.3.1 to 3.3.2 ([6ba554a](https://github.com/mattwebbio/orbital-sync/commit/6ba554a793f3a991f144727d431049a5dbe57f80))
* bump node-html-parser from 6.1.4 to 6.1.12 ([4121524](https://github.com/mattwebbio/orbital-sync/commit/4121524617814ce58a9f2e437deea738890b7bc4))

## [1.5.4](https://github.com/mattwebbio/orbital-sync/compare/v1.5.3...v1.5.4) (2024-02-01)


### Bug Fixes

* bump nodemailer and @types/nodemailer ([99982ff](https://github.com/mattwebbio/orbital-sync/commit/99982ff5763e910a70d5a0b5f5c59c59a17cedf7))

## [1.5.3](https://github.com/mattwebbio/orbital-sync/compare/v1.5.2...v1.5.3) (2024-01-31)


### Bug Fixes

* allow SMTP without credentials ([155d367](https://github.com/mattwebbio/orbital-sync/commit/155d3678d61d3e2b003c879cb08a8b63c8c562c6))

## [1.5.2](https://github.com/mattwebbio/orbital-sync/compare/v1.5.1...v1.5.2) (2023-03-23)

- Use project-scoped typescript during release [`0b12b2d`](https://github.com/mattwebbio/orbital-sync/commit/0b12b2d306adf33b4a4e448da1d07a778687f3f6)

## [1.5.1](https://github.com/mattwebbio/orbital-sync/compare/v1.5.1-0...v1.5.1) (2023-03-23)

- Bump nodemailer from 6.9.0 to 6.9.1 [`#141`](https://github.com/mattwebbio/orbital-sync/pull/141)
- Bump @honeybadger-io/js from 4.9.3 to 5.1.1 [`#148`](https://github.com/mattwebbio/orbital-sync/pull/148)
- Fix upload success expectation [`#163`](https://github.com/mattwebbio/orbital-sync/pull/163)
- Bump @honeybadger-io/js from 4.8.1 to 4.9.3 [`#130`](https://github.com/mattwebbio/orbital-sync/pull/130)
- Expect new response message [`1c527be`](https://github.com/mattwebbio/orbital-sync/commit/1c527bec4cb3d17255a2608f4b2130af272e5930)
- Fix timestamp expectations for latest Node [`4664c60`](https://github.com/mattwebbio/orbital-sync/commit/4664c602a12c4ed38662f3b5114da6bfa5428a75)

## [1.5.0](https://github.com/mattwebbio/orbital-sync/compare/v1.4.1-0...v1.5.0) (2022-11-29)

- Omit false form fields when creating backup [`#87`](https://github.com/mattwebbio/orbital-sync/pull/87)
- Bump typescript from 4.8.4 to 4.9.3 [`#90`](https://github.com/mattwebbio/orbital-sync/pull/90)

## [1.4.0](https://github.com/mattwebbio/orbital-sync/compare/v1.4.0-1...v1.4.0) (2022-11-05)

- Configure remote paths [`#68`](https://github.com/mattwebbio/orbital-sync/pull/68)
- Add dev container [`#74`](https://github.com/mattwebbio/orbital-sync/pull/74)
- Refactor Host to class & add default path [`cc1237e`](https://github.com/mattwebbio/orbital-sync/commit/cc1237ed3c18a4437175248799be52dcdb229b4c)
- Process paths from env, add tests [`06492e5`](https://github.com/mattwebbio/orbital-sync/commit/06492e512f2d94313e622987558c464e72667643)
- remove static /admin path from all requests and set default [`58036dc`](https://github.com/mattwebbio/orbital-sync/commit/58036dc8ed5a009951936a3ff227c0ea6480b692)

## [1.3.0](https://github.com/mattwebbio/orbital-sync/compare/v1.2.2-beta.0...v1.3.0) (2022-10-06)

- Update gravity after sync [`#50`](https://github.com/mattwebbio/orbital-sync/pull/50)
- Add gravity update [`2066860`](https://github.com/mattwebbio/orbital-sync/commit/20668603c869687e1bfa14d32187e7274dfec2e9)
- Make client error wording consistent [`6cd5a32`](https://github.com/mattwebbio/orbital-sync/commit/6cd5a32fa5f02996b3689431c6e7aa860a1ac9cd)
- Stringify non-string logging [`21737a9`](https://github.com/mattwebbio/orbital-sync/commit/21737a96fee2de8c0db50771f3bfe12cee637144)

## [1.2.1](https://github.com/mattwebbio/orbital-sync/compare/v1.2.0...v1.2.1) (2022-09-30)

- Bump nodemailer from 6.7.8 to 6.8.0 [`#48`](https://github.com/mattwebbio/orbital-sync/pull/48)
- Bump typescript from 4.8.3 to 4.8.4 [`#42`](https://github.com/mattwebbio/orbital-sync/pull/42)
- Bump node-html-parser from 6.0.0 to 6.1.1 [`#45`](https://github.com/mattwebbio/orbital-sync/pull/45)
- Bump @honeybadger-io/js from 4.1.3 to 4.3.1 [`#44`](https://github.com/mattwebbio/orbital-sync/pull/44)

## [1.2.0](https://github.com/mattwebbio/orbital-sync/compare/v1.1.3-beta.2...v1.2.0) (2022-09-30)

- Add notifications and better error handling [`#31`](https://github.com/mattwebbio/orbital-sync/pull/31)
- Add SMTP notifications [`80614fb`](https://github.com/mattwebbio/orbital-sync/commit/80614fba02a62aeab32b0ecfefd65366ea3622b8)
- Simplify verbose logging logic [`73fd7b1`](https://github.com/mattwebbio/orbital-sync/commit/73fd7b152efbeabf6c6cec69c75611d098038a78)

## [1.0.0](https://github.com/mattwebbio/orbital-sync/compare/v0.0.8...v1.0.0) (2022-08-30)

- Refactor `Config` for testability [`81df05f`](https://github.com/mattwebbio/orbital-sync/commit/81df05fc84c8158164075d9adeb32c832d73a276)

## 0.0.2 (2022-08-25)

- Initial commit [`023a0e9`](https://github.com/mattwebbio/orbital-sync/commit/023a0e9e0e1f0ed43963ca87532b2c02bc42211f)
- Add NPM package publish workflow [`c9aedce`](https://github.com/mattwebbio/orbital-sync/commit/c9aedcef8a0ada726061ee3623a4a963d9dd37f0)
- Add basic CI workflow [`b148deb`](https://github.com/mattwebbio/orbital-sync/commit/b148deb01bcad5d2b9abfb0abaa636cae828203d)
