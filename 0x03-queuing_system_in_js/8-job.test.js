import { expect } from "chai";
import { createQueue } from "kue";
import createPushNotificationsJobs from "./8-job.js";

describe("createPushNotificationsJobs", () => {
  let queue;

  beforeEach(() => {
    queue = createQueue();
    queue.testMode.enter();
  });

  afterEach(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it("throws an error if jobs is not an array", () => {
    expect(() => createPushNotificationsJobs({}, queue)).to.throw(
      "Jobs is not an array"
    );
  });

  it("creates jobs in the queue with the correct type and data", () => {
    const jobInfos = [
      {
        phoneNumber: "555-555-5555",
        message: "Hello, world!",
      },
      {
        phoneNumber: "444-444-4444",
        message: "Goodbye, world!",
      },
    ];

    createPushNotificationsJobs(jobInfos, queue);

    const jobs = queue.testMode.jobs;
    expect(jobs).to.have.lengthOf(jobInfos.length);

    jobs.forEach((job, index) => {
      expect(job.data).to.deep.equal(jobInfos[index]);
      expect(job.type).to.equal("push_notification");
    });
  });

  it("registers event handlers for each job", () => {
    const jobInfos = [
      {
        phoneNumber: "555-555-5555",
        message: "Hello, world!",
      },
      {
        phoneNumber: "444-444-4444",
        message: "Goodbye, world!",
      },
    ];

    createPushNotificationsJobs(jobInfos, queue);

    const jobs = queue.testMode.jobs;

    jobs.forEach((job) => {
      expect(job.listeners("progress")).to.have.lengthOf(1);
      expect(job.listeners("failed")).to.have.lengthOf(1);
      expect(job.listeners("complete")).to.have.lengthOf(1);
    });
  });
});
