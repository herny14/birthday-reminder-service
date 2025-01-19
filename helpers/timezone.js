import moment from "moment";
import "moment-timezone";

const isValidTimezone = (timezone) => {
  return moment.tz.zone(timezone) !== null;
}

export default {
  isValidTimezone
}