import { expect } from 'chai';
import sinon from 'sinon';
import moment from 'moment-timezone';
import User from '../models/user.model.js';

import userCtrl from "../controllers/user.controller.js";
import helperTimezone from "../helpers/timezone.js";

describe("createUser", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        newUser: {
          name: "Louise Doe",
          email: "invalid-email",
          birthday: "1992-01-15T00:00:00Z",
          timezone: "Europe/London",
        }
      }  
    }
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
  })

  afterEach(() => {
    sinon.restore();
  })


  it("should fail when email format is invalid", async () => {
    const invalidUser = new User({
      name: "Louise Doe",
      email: "invalid-email",
      birthday: "1992-01-15T00:00:00Z",
      timezone: "Europe/London",
    });
  
    try {
      await invalidUser.save();
      throw new Error("Test failed: invalid email was accepted"); 
    } catch (error) {
      expect(error).to.have.property("errors");
      expect(error.errors.email.message).to.equal("Invalid email format");
    }
  });
  
  

  it('should return 403 if invalid timezone', async () => {
    // Test with an invalid timezone
    req.body.newUser.timezone = "Invalid/Timezone";

    // Stub isValidTimezone to return false for invalid timezone
    sinon.stub(helperTimezone, 'isValidTimezone').returns(false);

    await userCtrl.createUser(req, res);

    // Assert that the response status is 403 (Forbidden)
    expect(res.status.calledWith(403)).to.be.true;

    // Assert that the response contains the correct message
    expect(res.json.calledWith({ message: "Invalid timezone" })).to.be.true;
  })

  it('should return 200 if valid timezone', async () => {
    // Test with a valid timezone
    req.body.newUser.timezone = "Asia/Kuala_Lumpur";

    // Stub isValidTimezone to return true for valid timezone
    sinon.stub(helperTimezone, 'isValidTimezone').returns(true);

    await userCtrl.createUser(req, res);

    // Assert that the response status is 200 (OK)
    expect(res.status.calledWith(200)).to.be.true;
  })
})