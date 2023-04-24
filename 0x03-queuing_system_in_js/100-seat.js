const express = require("express");
const redis = require("redis");
const { promisify } = require("util");
const kue = require("kue");

const client = redis.createClient();
const queue = kue.createQueue();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

async function reserveSeat(number) {
  try {
    await setAsync("available_seats", number.toString());
  } catch (err) {
    console.error("Error reserving seat:", err);
  }
}

async function getCurrentAvailableSeats() {
  try {
    const result = await getAsync("available_seats");
    return Number(result);
  } catch (err) {
    console.error("Error getting available seats:", err);
    return 0;
  }
}

const app = express();
let reservationEnabled = true;
reserveSeat(50);

app.get("/available_seats", async (req, res) => {
  try {
    const numberOfAvailableSeats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats });
  } catch (err) {
    console.error("Error getting available seats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/reserve_seat", async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: "Reservation are blocked" });
  }

  try {
    const job = queue
      .create("reserve_seat", {})
      .priority("high")
      .attempts(5)
      .save((err) => {
        if (err) {
          console.error("Error creating job:", err);
          return res.json({ status: "Reservation failed" });
        }
        res.json({ status: "Reservation in process" });
      });
  } catch (e) {
    console.log(e);
  }
});

app.get("/process", async (req, res) => {
  res.json({ status: "Queue processing" });

  queue.process("reserve_seat", async (job, done) => {
    try {
      const currentAvailableSeats = await getCurrentAvailableSeats();
      if (currentAvailableSeats <= 0) {
        reservationEnabled = false;
        return done(new Error("Not enough seats available"));
      }
      const newAvailableSeats = currentAvailableSeats - 1;
      await reserveSeat(newAvailableSeats);
      if (newAvailableSeats === 0) {
        reservationEnabled = false;
      }
      done();
    } catch (err) {
      console.error("Error processing job:", err);
      done(err);
    }
  });
});

// Start the server
app.listen(1245, () => console.log("Server listening on port 1245"));
