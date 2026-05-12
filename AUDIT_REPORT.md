# Audit Report

## Observations

1. **Total number of `fetch()` calls**: 12
2. **Total number of hardcoded `https://fakestoreapi.com` URLs**: 13
3. **Total number of `localStorage.getItem('auth_token')` usages**: 5

## Architectural Problems

The scattered API calls present several maintainability problems:

1. **Hardcoded URLs**: The API base URL `https://fakestoreapi.com` is repeated 13 times across the codebase. If the backend URL ever changes, it requires manually updating 13 different lines of code across 4 files. There is no single source of truth for the API configuration.
2. **Duplicated Authentication Logic**: Extracting the `auth_token` from `localStorage` and manually setting the `Authorization` header is repeated 5 times. If the authentication mechanism changes (e.g., to cookies or a different header format), every single authenticated request must be rewritten.
3. **Inconsistent Error Handling**: Every `fetch` call handles errors individually. Some components might catch errors using `.catch()`, some use `try...catch` blocks with `async/await`, while others may not handle failures at all. A globally consistent error response, like handling 401 Unauthorized responses to log the user out, is impossible without a centralized interceptor.
4. **Mixed Fetch Patterns**: The codebase relies on a mix of `.then()` promise chains and `async/await` syntax, which makes the code difficult to read, reason about, and debug. There are also nested fetch calls which create "spaghetti code" and lead to callback hell or complicated async logic.
