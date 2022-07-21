import mongoose ,{Schema} from mongoose;


const TimeLimitAttendanceSchema = new Schema({
    shift_name:{type:String,required:[true,"El campo nombre de turno es requerido"]},
    time_start:{type:Date,required:true,required:[true,"El campo inicio de asistencia es requerido"]},
    time_end:{type:Date,required:true, required:[true,"El campo fin de asistencia es requerido"]},
    status:{type:Boolean,required:true,default:true},
},{timestamps:true});

export default mongoose.models.TimeLimitAttendance || mongoose.model("TimeLimitAttendace",TimeLimitAttendanceSchema);