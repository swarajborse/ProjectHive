# Simple Banking App

**Contributor:** AksharGoyal

## Overview
A banking system application built in Rust.

## Tech stack
- Rust

## Prerequisites
- Rust

## Quickstart 
1. Make sure you are in banking-system directory. Then run
```sh
cargo install --path .
```

That's it! You can now use the command `banking-system` command in your cli to do simple bank-related operations.  

2. You can also add your own tests and check them:
```sh
cargo test -- --test-threads=1
```

## banking-system subcommands

You can run the following subcommands (ex: create) in 2 ways.
```sh
banking-system create # or
cargo run -- create
```

- create                  — Creates a new account with randomly generated account number and PIN
- login <account> <PIN>   — Logins to an existing account to allow user to do banking operations 
- delete <account> <PIN>  - Deletes the existing account

## Examples 

Create an account:
```sh
banking-system create
>>> YOUR NEW ACCOUNT: `6046334535`
>>> YOUR PIN: `688154`
```

Login into an existing account:
```sh
banking-system login 6046334535 688154
```

Delete an existing account
```sh
banking-system delete 6046334535 688154
```
