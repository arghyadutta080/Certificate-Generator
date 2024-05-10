import mongoose from "mongoose"

const certificateSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    image_url: {
        type: String,
        required: true
    },
},
    { timestamps: true } 
);

const certificateModel = mongoose.model('certificates', certificateSchema);

export { certificateModel }