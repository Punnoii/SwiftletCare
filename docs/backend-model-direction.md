# Backend Model Direction

## Current Backend Model Review

The backend currently has no dedicated `models` directory. Model names are still embedded in controllers and SQL queries.

Old references found:
- `Staff`
- `firstname`
- `surname`
- `meta`

## Models That Do Not Fit SwiftletCare

- `Staff` should be replaced by `UserAccount`
- `firstname` and `surname` should become `name`
- `meta` should be replaced by explicit fields or related tables

## Required SwiftletCare Models

- `UserAccount`: account and authentication data
- `SwiftletHouse`: swiftlet house domain data
- `Sensor`: sensor records linked to a swiftlet house

## Model Naming Direction

- `Staff` -> `UserAccount`
- `firstname` + `surname` -> `name`
- `meta` -> explicit fields or related tables
- swiftlet house data -> `SwiftletHouse`
- sensor data -> `Sensor`

## Follow-Up Backend Refactoring

- Update auth queries to use `UserAccount`
- Update request fields from `firstname` / `surname` to `name`
- Add model or data-access files if the backend is split out of controllers later
- Update controllers to use SwiftletCare naming
