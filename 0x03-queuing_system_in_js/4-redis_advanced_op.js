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

const getInfo = (key, field, value) => {
  client.hset(key, field, value, () => {
    print(null, 1);
  });
};

const info = {
  'Portland': "50",
  'Seattle': "80",
  'New York': "20",
  'Bogota': "20",
  'Cali': "40",
  'Paris': "2",
};

for (const [key, values] of Object.entries(info)) {
  getInfo("HolbertonSchools", key, values);
}

const hgetallAsync = promisify(client.hgetall).bind(client);

const runAsync = async () => {
  const result = await hgetallAsync("HolbertonSchools");
  console.log(result);
};

runAsync();
