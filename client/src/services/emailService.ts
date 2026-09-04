import emailjs from '@emailjs/browser';

interface ReservationEmailData {
  guestName: string;
  guestEmail: string;
  restaurantName: string;
  guests: number;
  date: string;
  timeSlot: string;
  seatingArea: string;
  occasion: string;
  bookingRef: string;
  restaurantAddress: string;
  specialRequests?: string;
}

export const sendReservationEmail = async (
  reservation: ReservationEmailData
) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  console.log('EmailJS config:', {
    serviceId,
    templateId,
    publicKey,
  });

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS environment variables are missing.');
  }

  const templateParams = {
    to_name: reservation.guestName,
    to_email: reservation.guestEmail,
    restaurant_name: reservation.restaurantName,
    guests: reservation.guests,
    reservation_date: reservation.date,
    reservation_time: reservation.timeSlot,
    seating_area: reservation.seatingArea,
    occasion: reservation.occasion,
    booking_reference: reservation.bookingRef,
    restaurant_address: reservation.restaurantAddress,
    special_requests: reservation.specialRequests || 'None',
    from_name: 'HungryBear',
  };

  const response = await emailjs.send(
    serviceId,
    templateId,
    templateParams,
    {
      publicKey,
    }
  );

  console.log('EmailJS SUCCESS:', response.status, response.text);

  return response;
};