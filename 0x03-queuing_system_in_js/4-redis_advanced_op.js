import { promisify } from "util";
import { createClient, print } from "redis";

const client = createClient();
async () => {
  await client.connected();
};

client.on("ready", () => {
  console.log("Redis client connected to the server");
});

client.on("Error", (err) => {
  console.log("Redis client not connected to the server:", err);
});

client.hset("HolbertonSchools", "Portland", 50, print);
client.hset("HolbertonSchools", "Seattle", 80, print);
client.hset("HolbertonSchools", "New York", 20, print);
client.hset("HolbertonSchools", "Bogota", 20, print);
client.hset("HolbertonSchools", "Cali", 40, print);
client.hset("HolbertonSchools", "Paris", 2, print);

const hgetallAsync = promisify(client.hgetall).bind(client);

const runAsync = async () => {
  const result = await hgetallAsync("HolbertonSchools");
  console.log(result);
};

runAsync();