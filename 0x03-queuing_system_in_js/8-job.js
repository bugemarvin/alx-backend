function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error("Jobs is not an array");
  }

  for (let i = 0; i < jobs.length; i++) {
    const jobData = jobs[i];
    const job = queue
      .create("push_notification_code_3", jobData)
      .save(function (err) {
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
