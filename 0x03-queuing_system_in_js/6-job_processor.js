import kue from "kue";
import redis from "redis";

const redisClient = redis.createClient();
const queue = kue.createQueue({ redis: redisClient });
const job = queue
  .create("push_notification_code", {
    phoneNumber: "4153518780",
    message: "This is the code to verify your account",
  })
  .save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Notification job created: ${job.id}`);
    }
  });

function sendNotification(phoneNumber, message) {
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );
}

queue.process("push_notification_code", (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done();
});

queue.on("error", (err) => {
  console.log(`Queue error: ${err}`);
});
