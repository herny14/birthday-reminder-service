import User from "./models/user.model.js";
import cron from "node-cron";

import moment from "moment";
import "moment-timezone";

export const reminderWorker = async () => {
  try {

    const startOfRange = moment().tz("Asia/Jakarta").subtract(1, 'days').startOf('day').toDate();
    const endOfRange = moment().tz("Asia/Jakarta").add(1, 'days').endOf('day').toDate();

    const listUsers = await User.find({
      birthday: { "$gte": startOfRange, "$lte": endOfRange }
    });

    for (const user of listUsers) {
      const userBirthday = moment(user.birthday).format("MM-DD");
      const userTimezone = user.timezone;
      const userToday = moment().tz(userTimezone).format("MM-DD");

      if (userBirthday === userToday) {
        const currentTimeInUserTimezone = moment().tz(userTimezone);

        // CHECK IF IT IS 9 AM IN THEIR LOCAL TIMEZONE
        const targetTime = currentTimeInUserTimezone.clone().hour(9).minute(0).second(0);
        
        // const targetTime = currentTimeInUserTimezone.clone().hour(12).minute(6).second(0);

        if (currentTimeInUserTimezone.isSame(targetTime)) {
          console.log(`HAPPY BIRTHDAY ${user.name}`);
        }
      }
    }
    
  }
  catch (err) {
    console.log('ERR: ', err)
  }
}

const cronSendDailyMessage = () => {
  cron.schedule("* * * * *", function () {
    reminderWorker();
  }, {
    scheduled: true,
    timezone: "Asia/Jakarta"
  });

};

cronSendDailyMessage();