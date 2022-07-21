import moment from "moment";
import shiftModels from "../../models/shiftModels";
import seasonModels from "../../models/seasonModels";
import userModels from "../../models/userModels";
// import timeLimitAttendancesModels

export const setStatusAttendance = async (season, type_attendance) => {
  const shift = await shiftModels.findOne({ _id: season.shift });
  const shiftToJSON = shift.toJSON();
  const { shift_start, shift_end } = shiftToJSON;

  switch (type_attendance) {
    case "entry": {
      if (
        moment().toDate() <=
        moment({ hour: shift_start.hour, minute: shift_start.minute }).toDate()
      ) {
        return "temprano";
      } else {
        return "tarde";
      }
    }
    case "exit": {
      return "registrado";
    }
    default: {
      return "registrado";
    }
  }
};
