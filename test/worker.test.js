import sinon from 'sinon';
import moment from 'moment-timezone';
import { expect } from 'chai';
import User from '../models/user.model.js';
import { reminderWorker } from '../worker.js';

describe('reminderWorker', () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should log birthday message if it's the user's birthday at 9 AM", async () => {
    const user = {
      name: "John Doe",
      birthday: "1990-01-16T00:00:00Z",
      timezone: "Asia/Jakarta",
    };

    // Stub User.find() to return mock users
    sinon.stub(User, 'find').resolves([user]);

    // Stub console.log
    const logSpy = sinon.stub(console, 'log');

    // Stub moment to simulate 9 AM Jakarta time
    const fakeMoment = moment().tz(user.timezone).hour(9).minute(0).second(0);
    
    sinon.stub(moment.prototype, 'tz').callsFake(function () {
      return fakeMoment;
    });

    // Call the worker
    await reminderWorker();

    // Assert log was called
    expect(logSpy.calledWithExactly(`HAPPY BIRTHDAY John Doe`)).to.be.true;
  });
});
