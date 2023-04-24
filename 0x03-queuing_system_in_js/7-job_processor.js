import kue from "kue";
import { promisify } from "util";

const queue = kue.createQueue();
const progressInterval = 10; // in percentage

const blacklistedNumbers = ["4153518780", "4153518781"];

const sendNotification = async (phoneNumber, message, job, done) => {
  try {
    job.progress(0);

    if (blacklistedNumbers.includes(phoneNumber)) {
      throw new Error(`Phone number ${phoneNumber} is blacklisted`);
    }

    job.progress(50);
    console.log(
      `Sending notification to ${phoneNumber}, with message: ${message}`
    );

    done();
  } catch (err) {
    done(err);
  }
};

queue.process("push_notification_code_2", 2, async (job, done) => {
  const { phoneNumber, message } = job.data;

  console.log(`Notification job #${job.id} ${job.progress()}% complete`);

  try {
    const sendNotificationAsync = promisify(sendNotification);
    await sendNotificationAsync(phoneNumber, message, job, done);
  } catch (err) {
    console.error(`Notification job #${job.id} failed: ${err.message}`);
    done(err);
  }
});

console.log("Job processor is running");
