import { Router } from 'express';
import { ReservationController } from '../controllers/reservationController.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';

const router = Router();

router.get('/availability', ReservationController.checkAvailability);
router.post('/', optionalAuth, ReservationController.createReservation);
router.get('/', requireAuth, ReservationController.getUserReservations);
router.get('/:id', ReservationController.getReservationById);
router.put('/:id/cancel', optionalAuth, ReservationController.cancelReservation);

export default router;