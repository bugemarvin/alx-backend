function createPushNotificationsJobs(jobs, queue) {
  if (!(jobs instanceof Array)) {
    console.error("Jobs is not an array");
  } else {
    const length = jobs.length;
    for (let i = 0; i < length; i++) {
      const jobData = jobs[i];
      const job = queue;
      job.create("push_notification_code_3", jobData).save(function (err) {
        if (err) {
          console.log(`Notification job ${job.id} failed: ${err}`);
        } else {
          console.log(`Notification job created: ${job.id}`);
        }
      });

      job.on("complete", function () {
        console.log(`Notification job ${job.id} completed`);
      });

      job.on("failed", function (err) {
        console.log(`Notification job ${job.id} failed: ${err}`);
      });

      job.on("progress", function (progress) {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });
    }
  }
}

export default createPushNotificationsJobs;
