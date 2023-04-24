import kue from "kue";
import redis from "redis";

const jobs = [
  {
    phoneNumber: "4153518780",
    message: "This is the code 1234 to verify your account",
  },
  {
    phoneNumber: "4153518781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153518743",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4153538781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153118782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4153718781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4159518782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4158718781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153818782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4154318781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4151218782",
    message: "This is the code 4321 to verify your account",
  },
];

const redisClient = redis.createClient();
const queue = kue.createQueue({ redis: redisClient });

for (let i = 0; i < jobs.length; i++) {
  const job = queue.create("push_notification_code_2", jobs[i]).save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Notification job created: ${job.id}`);
    }
  });

  job.on("complete", () => {
    console.log(`Notification job ${job.id} completed`);
  });

  job.on("failed", (err) => {
    console.log(`Notification job ${job.id} failed: ${err}`);
  });

  job.on("progress", (progress) => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
  });
}

queue.on('error', (err) => {
        console.log(`Queue error: ${err}`);
});
