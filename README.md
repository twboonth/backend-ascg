# REST API Example
```
npm install
```
## change example.env to .env

#### [Optional] Switch database to Prisma Postgres

This example uses a local SQLite database by default. If you want to use to [Prisma Postgres](https://prisma.io/postgres), follow these instructions (otherwise, skip to the next step):



### 1. Create and seed the database

Run the following command to create your database. This also creates the `Vehicle` and `RentalContract` tables that are defined
```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.

**If you switched to Prisma Postgres in the previous step**, you need to trigger seeding manually (because Prisma Postgres already created an empty database instance for you, so seeding isn't triggered):

```
npx prisma db seed
```


### 2. Start the REST API server

```
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.
