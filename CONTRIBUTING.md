<!-- SPDX-License-Identifier: CC0-1.0 -->

# Contributing Guidelines

The _Trusted Types tests_ project welcomes contributions and corrections of all
forms. This includes new and fixed tests, improvements to the documentation or
test infrastructure, and corrections - or anything else you believe is useful.
We recommend you open an issue before making any substantial changes so you can
be sure your work won't be rejected.

If you decide to make a contribution, please do use the following workflow:

- Fork the repository.
- Create a new branch from the latest `main`.
- Make your changes on the new branch.
- Commit to the new branch and push the commit(s).
- Open a Pull Request against `main`.

## Changing Tests

### `index.html`

To add a new test for an uncovered DOM API (or missing API parameter) add a new
`test()` call to `index.html`. Please keep the test order alphabetical. If the
test requires a specific element (or similar), add it to the `providers` object.

Similarly, to update a test change an existing `test()` call in `index.html`.

### `attributes.html`

The HTML element attributes test suite was designed to not require manual
changes. Still, you could:

1. fix the `corrections` object,
1. improve the automated selection of `attributes` to test,
1. improve the automated selection of `HTMLElement`s to test,
1. improve the test logic itself.
