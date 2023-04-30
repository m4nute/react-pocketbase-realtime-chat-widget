** Not Styled **

Realtime Chat Widget with Admin Dashboard.

Made with React and Pocketbase.
There is ample room for improvement in the real-time and React Query implementations, particularly in terms of clean code and performance.
Realtime subscriptions are throwing an error, couldn't debug it but it works anyway.

Routes:
./ for anonymous users
./admin for login
./chats for opened chat rooms (realtime as well)
./chats/:id for specific chat with user's fingerprint
./iframe for Chat Widget


To run:

pnpm dev (start vite)

cd [your-pocketbase-installation]
./pocketbase serve (start pocketbase)

For building your pocketbase schema, import the JSON file called "pb_schema.json" in pocketbase dashboard (settings/import_collections/load_from_JSON_file)
