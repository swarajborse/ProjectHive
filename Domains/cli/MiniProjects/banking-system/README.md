# Simple Banking App (banking-system)

A small CLI banking system written in Rust for learning and demo purposes.  
Provides account creation, login, simple operations and account deletion via a single binary.

**Contributor:** AksharGoyal

---

## Features
- Create accounts with randomly generated 10-digit account numbers and 6-digit PINs
- Login using account number + PIN
- Delete accounts
- Persistent storage using SQLite (via rusqlite) so accounts survive between runs
- CLI parsing and subcommands handled with clap for a familiar UX and easy extension
- Random data generation uses rand for account numbers and PINs

Dependency mapping (from Cargo.toml):
- clap — command-line parsing and subcommands
- rand — secure-ish random generation for account numbers and PINs
- rusqlite — persistent SQLite backend (database file is created in the working directory by default)

## Prerequisites
- Rust toolchain (rustc + cargo) installed
  - Install from https://rustup.rs if needed

## Quickstart

1. Change into the project directory:
   ```sh
   cd ./Domains/cli/MiniProjects/banking-system # Assuming you are in ProjectHive repo
   ```

2. Install the CLI locally:
   ```sh
   cargo install --path .
   ```
   This installs a `banking-system` binary into your cargo bin directory (usually ~/.cargo/bin).

3. Run commands directly (either with the installed binary or via cargo):
   ```sh
   # using installed binary
   banking-system create

   # or using cargo (no install required)
   cargo run -- create
   ```

## Commands / Usage

- Create a new account
  ```sh
  banking-system create
  ```
  Example output:
  ```
  YOUR NEW ACCOUNT: 6046334535
  YOUR PIN: 688154
  ```

- Login to an existing account
  ```sh
  banking-system login <account_number> <pin>
  ```
  Example:
  ```sh
  banking-system login 6046334535 688154
  ```

- Delete an existing account
  ```sh
  banking-system delete <account_number> <pin>
  ```
  Example output:
  ```
  banking-system delete 6046334535 688154
  >>> DELETED ACCOUNT: 6046334535
  ```

Notes:
- You can run any command via `cargo run -- <subcommand> ...` while developing.
- Keep your generated account numbers and PINs safe for subsequent operations.

## Testing
Run the unit tests:
```sh
cargo test -- --test-threads=1
```
(Tests are run single-threaded to avoid concurrency issues with any shared test state.)

## Development tips
- Format code with:
  ```sh
  cargo fmt
  ```
- Check for common issues:
  ```sh
  cargo clippy -- -D warnings
  ```
- To iterate quickly without installing:
  ```sh
  cargo run -- <subcommand>
  ```
- To uninstall the app & clean everything:
  ```sh
  cargo uninstall banking-system
  cargo clean
  ```
