import { response } from "express";
import { createClient } from "redis";
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
    console.log('Reply:', response);
  });
}

function displaySchoolValue(schoolName) {
        try {
                const clientAsync = promisify(client.get).bind(client);
                const response = await clientAsync(schoolName);
                console.log(response);
        } catch (err) {
                console.log(err)
        }
  });
}

displaySchoolValue("Holberton");
setNewSchool("HolbertonSanFrancisco", "100");
displaySchoolValue("HolbertonSanFrancisco");
