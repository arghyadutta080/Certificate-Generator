import mongoose from "mongoose";

const issueCertificateSchema = new mongoose.Schema({
    certificate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'certificates',
        required: true
    },
    requested_by: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        default: 'pending'
    },
    google_drive_url: {
        type: String,
        required: false,
        default: ''
    }
},
    { timestamps: true }
);

const issueCertificateModel = mongoose.model('issue_certificates', issueCertificateSchema);

export { issueCertificateModel }