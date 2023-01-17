# Backend Challenge

## Installation & configuration

```bash
# install dependencies
$ npm install
# copy example configuration file
$ cp .env.example .env
```

## Running the app

```bash
# development
$ npm run start
# watch mode
$ npm run start:dev
# production mode
$ npm run build
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## Scenario

In a real life scenario, the subscriptions import would be scheduled or triggered by a webhook on subscription activity.

For this exercice's simulation purposes, an import endpoint has been provided on `GET /subscriptions/import`.

## Routes

- `GET /subscriptions`: Returns all subscriptions with MRR infos.
- `GET /subscriptions/{YYYY-MM}`: Returns subscriptions with MRR infos for the specified month.
- `GET /subscriptions/import`: Triggers import of the subscriptions for the "current month".

## MRR fields

- `subscriptions[i].mrr`: subscription's MRR
- `subscriptions[i].mrr_difference`: subscription's MRR difference from the previous month
- `total_mrr`: month's total MRR
- `total_mrr_difference`: month's total MRR difference from the previous month

_Note: all MRR values are in dollar ($) cents_
