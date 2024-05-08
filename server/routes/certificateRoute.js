import express from 'express';
import { addCertificate, approveRequests, getCertificateRequests, getCertificates, getMyCertificates, getRequestById, requestCertificate } from '../controller/manageCertificate.js';
import { authenticate } from '../middleware/authenticate.js';

const certificateRoute = express.Router();

// accessable by admin only
certificateRoute.post('/api/manage-certificate/admin/add-new', authenticate, addCertificate);
certificateRoute.get('/api/manage-certificate/admin/get-requests', authenticate, getCertificateRequests);
certificateRoute.get('/api/manage-certificate/admin/get-requests/:reqId', authenticate, getRequestById);
certificateRoute.put('/api/manage-certificate/admin/approve-request/:requestId', authenticate, approveRequests);

// accessable by public
certificateRoute.get('/api/manage-certificate/get-all', getCertificates);

// accessable by all authenticated users
certificateRoute.get('/api/manage-certificate/user/request/:certificateId', authenticate, requestCertificate);
certificateRoute.get('/api/manage-certificate/user/my-certificates', authenticate, getMyCertificates);

export { certificateRoute };