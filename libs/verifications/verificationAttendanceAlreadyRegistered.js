import dbConnect from "../dbConnectLibs";
import attendanceModels from "../../models/attendanceModels";
import moment from "moment";
export const verificationAttendanceAlreadyRegistered = async (userId) => {
  try {
    await dbConnect();
    const attendances = await attendanceModels.find({
      user: userId,
    });
    if (attendances.length === 0) {
      return { ok: false, type_attendance: "entry" };
    } else {
      if (
        moment().format("L") ==
        moment(attendances[attendances.length - 1].updatedAt).format("L")
      ) {
        switch (attendances[attendances.length - 1].type_attendance) {
          case "entry": {
            return { ok: false, type_attendance: "exit" };
          }
          case "exit": {
            return { ok: true, type_attendance: "entry" };
          }
          default: {
            console.error({ msg: "el type_attendance no es válido" });
          }
        }
      } else {
        return { ok: false, type_attendance: "entry" };
      }
    }
  } catch (error) {
    console.error(error);
  }
};
