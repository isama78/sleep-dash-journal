# Sleep Journal

A web application for tracking and improving sleep habits. Users can register, log in, and create, edit and delete new journal entries. Entries include date, sleep/wake times, sleep quality, and notes.

## Team Members

- Aurora Isabelle Norlund
- Carson Landvatter
- Dany Jimenez
- Mauro Jose Isa



## Technologies

- Next.js
- TypeScript
- Tailwind CSS
- PostgreSQL

## Setup and Deployment

- The project is live and functioning at the Vercel link provided, but if you need to deploy locally, you can copy the repo and run npm run build (contact team for necessary env variables).

## API

- The API is primarily used by the application itself, but the following routes could provide clients access to:
-  /api/entries/[user_id]: will pull up all entries for given user
-  /api/entries/[id]: will pull up specific entry by ID
-  /api/users/[user_id]: will pull up profile details for given user

## Known Issues

- No known issues exist at this time.
