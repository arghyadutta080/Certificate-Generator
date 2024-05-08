import asyncErrorHandler from "../middleware/asyncErrorHandler.js";
import { certificateModel } from "../model/certificate.js";
import { issueCertificateModel } from "../model/issue_certificate.js";
import { ErrorHandler } from "../utils/customError.js";

// accessable by admin only
const addCertificate = asyncErrorHandler(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("Profile not found!", 404));
    }

    if (req.user.role !== 'admin') {
        return next(new ErrorHandler("You are not authorized to add certificate", 403));
    }

    const { title, image_url } = req.body;
    const certificate = new certificateModel({ title, image_url });
    await certificate.save();
    return res.status(201).json({
        success: true,
        message: "Certificate added successfully",
        certificate
    })
})


// accessable by public
const getCertificates = asyncErrorHandler(async (req, res, next) => {
    const certificates = await certificateModel.find({});

    return res.status(200).json({
        success: true,
        certificates
    })
})


// accessable by all authenticated users
const requestCertificate = asyncErrorHandler(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("Profile not found!", 404));
    }

    const { certificateId } = req.params;
    const certificate = await certificateModel.findById(certificateId);

    if (!certificate) {
        return next(new ErrorHandler("Certificate not found", 404));
    }

    const newRequest = new issueCertificateModel({
        certificate,
        requested_by: req.user.email,
        username: req.user.username
    });
    await newRequest.save();

    return res.status(201).json({
        success: true,
        message: "Request sent successfully",
        newRequest
    })
})


// accessable by admin only
// view all certificate requests(pending and approved)
const getCertificateRequests = asyncErrorHandler(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("Profile not found!", 404));
    }

    if (req.user.role !== 'admin') {
        return next(new ErrorHandler("You are not authorized to view certificate requests", 403));
    }

    const requests = await issueCertificateModel.find({}).populate('certificate');
    return res.status(200).json({
        success: true,
        requests
    })
})


// accessable by admin only
const getRequestById = asyncErrorHandler(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("Profile not found!", 404));
    }

    if (req.user.role !== 'admin') {
        return next(new ErrorHandler("You are not authorized to view certificate requests", 403));
    }
    const { reqId } = req.params;
    const request = await issueCertificateModel.findById(reqId).populate('certificate');
    return res.status(200).json({
        success: true,
        request
    })
})


// accessable by admin only
const approveRequests = asyncErrorHandler(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("Profile not found!", 404));
    }

    if (req.user.role !== 'admin') {
        return next(new ErrorHandler("You are not authorized to approve requests", 403));
    }

    const { google_drive_url, state } = req.body;

    if (!google_drive_url || !state) {
        return next(new ErrorHandler("All fields are mandatory to proceed", 400));
    }

    const { requestId } = req.params;
    const request = await issueCertificateModel.findById(requestId).populate('certificate');

    if (!request) {
        return next(new ErrorHandler("Request not found", 404));
    }

    request.google_drive_url = google_drive_url;
    request.state = state;
    await request.save();

    return res.status(200).json({
        success: true,
        message: "Request approved successfully",
        request
    })
})


// accessable by all authenticated users
// get all Requested and Approved Certificates
const getMyCertificates = asyncErrorHandler(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("Profile not found!", 404));
    }

    const requests = await issueCertificateModel.find({ requested_by: req.user.email }).populate('certificate');
    return res.status(200).json({
        success: true,
        requests
    })
})


export { addCertificate, getCertificates, requestCertificate, getCertificateRequests, approveRequests, getMyCertificates, getRequestById }