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

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (err, response) => {
    if (err) console.log(err);
    if (response === "OK") {
      console.log("Reply:", response);
    }
  });
}

async function displaySchoolValue(schoolName) {
  const clientAsync = promisify(client.get).bind(client);
  try {
    const response = await clientAsync(schoolName);
    console.log(response);
  } catch (err) {
    const errors = await clientAsync(err);
    console.log(errors);
  }
}

client.HSET("HolbertonSchools", 'Portland', 50, print);
client.HSET("HolbertonSchools", "Seattle", 80, print);
client.HSET("HolbertonSchools", 'New York', 20, print);
client.HSET("HolbertonSchools", 'Bogota', 20, print);
client.HSET("HolbertonSchools", 'Cali', 40, print);
client.HSET("HolbertonSchools", 'Paris', 2, print);
client.hgetall('HolbertonSchools', (_error, value) => console.log(value));