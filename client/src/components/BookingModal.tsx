import React, { useState, useEffect } from 'react';
import { Restaurant, Reservation } from '../types/restaurant';
import { SEATING_OPTIONS, OCCASIONS } from '../data/restaurants';
import { sendReservationEmail } from '../services/emailService';

import {
  X,
  Clock,
  Users,
  CheckCircle,
  MapPin,
  Sparkles,
  ShieldCheck,
  Utensils,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface BookingModalProps {
  restaurant: Restaurant | null;
  preselectedSlot?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (reservation: Reservation) => void;
}

export default function BookingModal({
  restaurant,
  preselectedSlot,
  isOpen,
  onClose,
  onConfirmBooking,
}: BookingModalProps) {
  const [step, setStep] = useState<'details' | 'guests' | 'confirmed'>(
    'details'
  );

  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('Tomorrow, Sep 5');
  const [timeSlot, setTimeSlot] = useState(preselectedSlot || '7:00 PM');
  const [seatingArea, setSeatingArea] = useState('Main Dining Room');
  const [occasion, setOccasion] = useState('Casual Dining');
  const [specialRequests, setSpecialRequests] = useState('');

  const [guestName, setGuestName] = useState('Sushmita Maurya');
  const [guestEmail, setGuestEmail] = useState(
    'mauryasushmita9422@gmail.com'
  );
  const [guestPhone, setGuestPhone] = useState('+1 (555) 234-5678');

  const [confirmedReservation, setConfirmedReservation] =
    useState<Reservation | null>(null);

  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (preselectedSlot) {
      setTimeSlot(preselectedSlot);
    } else if (restaurant?.availableSlots?.length) {
      setTimeSlot(restaurant.availableSlots[0]);
    }

    setStep('details');
    setEmailSent(false);
    setEmailError('');
  }, [preselectedSlot, restaurant]);

  if (!isOpen || !restaurant) return null;

  const handleProceedToGuests = () => {
    setStep('guests');
  };

  const handleCompleteReservation = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSendingEmail(true);
    setEmailSent(false);
    setEmailError('');

    const randomRef =
      'DT-' + Math.floor(10000 + Math.random() * 90000);

    const newReservation: Reservation = {
      id: 'res-' + Date.now(),
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantImage: restaurant.image,
      restaurantNeighborhood: restaurant.neighborhood,
      restaurantAddress: restaurant.address,
      guests,
      date,
      timeSlot,
      seatingArea,
      occasion,
      specialRequests: specialRequests.trim() || undefined,
      guestName,
      guestEmail,
      guestPhone,
      status: 'confirmed',
      bookingRef: randomRef,
      createdAt: 'Just now',
    };

    try {
      /*
       * Send confirmation email
       */
      await sendReservationEmail({
        guestName,
        guestEmail,
        restaurantName: restaurant.name,
        guests,
        date,
        timeSlot,
        seatingArea,
        occasion,
        bookingRef: randomRef,
        restaurantAddress: restaurant.address,
        specialRequests: specialRequests.trim() || undefined,
      });

      setEmailSent(true);

      console.log('Reservation email successfully sent.');
    } catch (error) {
      console.error('Reservation email failed:', error);

      setEmailSent(false);
      setEmailError(
        'Reservation confirmed, but we could not send the confirmation email.'
      );
    } finally {
      /*
       * Save reservation even if email fails.
       */
      setConfirmedReservation(newReservation);
      onConfirmBooking(newReservation);
      setIsSendingEmail(false);
      setStep('confirmed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600/10 text-amber-700 flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>

            <div>
              <h2 className="text-base font-bold font-serif text-stone-900">
                Reserve Table at {restaurant.name}
              </h2>

              <p className="text-[11px] text-stone-500">
                {restaurant.neighborhood} • {restaurant.cuisine}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/60 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">

          {/* STEP 1 */}
          {step === 'details' && (
            <div className="space-y-6">

              <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl">
                <Sparkles className="w-4 h-4" />
                <span>
                  Step 1 of 2: Select Dining Preferences & Time Slot
                </span>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Number of Guests
                </label>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        guests === num
                          ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Select Date
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    'Today, Sep 4',
                    'Tomorrow, Sep 5',
                    'Saturday, Sep 6',
                    'Sunday, Sep 7',
                  ].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDate(d)}
                      className={`py-2.5 px-3 rounded-xl font-semibold transition-all border text-center cursor-pointer ${
                        date === d
                          ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Available Time Slots
                </label>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {restaurant.availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                        timeSlot === slot
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-amber-50/60 text-amber-900 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Seating Area Preference
                </label>

                <div className="space-y-2">
                  {SEATING_OPTIONS.map((area) => (
                    <label
                      key={area.id}
                      onClick={() => setSeatingArea(area.name)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                        seatingArea === area.name
                          ? 'bg-amber-50 border-amber-500 text-stone-900 font-semibold'
                          : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      <div>
                        <div className="font-bold">{area.name}</div>
                        <div className="text-[11px] text-stone-500">
                          {area.desc}
                        </div>
                      </div>

                      <input
                        type="radio"
                        name="seating"
                        checked={seatingArea === area.name}
                        onChange={() => setSeatingArea(area.name)}
                        className="accent-amber-600 w-4 h-4 cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleProceedToGuests}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <span>Continue to Guest Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 'guests' && (
            <form
              onSubmit={handleCompleteReservation}
              className="space-y-5"
            >
              <div className="flex items-center justify-between bg-amber-50 px-3 py-2 rounded-xl text-xs font-semibold text-amber-900">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Table for {guests} on {date} at {timeSlot}
                </span>

                <span className="text-[11px] bg-amber-200/70 px-2 py-0.5 rounded-md">
                  {seatingArea}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Full Name
                  </label>

                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g. Sushmita Maurya"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="name@example.com"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Occasion
                  </label>

                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {OCCASIONS.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Special Requests
                  </label>

                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) =>
                      setSpecialRequests(e.target.value)
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Dietary allergies, high chair, flowers..."
                  />
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 text-xs text-stone-600 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />

                <div>
                  <div className="font-bold text-stone-900">
                    HungryBear Guarantee & Policy
                  </div>

                  <div className="mt-0.5 text-[11px] text-stone-500">
                    Free cancellation up to 2 hours before dining time.
                    No credit card required to hold standard tables.
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">

                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSendingEmail}
                  className={`bg-amber-600 hover:bg-amber-500 text-white px-7 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg transition-all ${
                    isSendingEmail
                      ? 'opacity-70 cursor-not-allowed'
                      : 'cursor-pointer active:scale-95'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />

                  {isSendingEmail
                    ? 'Sending Confirmation...'
                    : 'Confirm Reservation'}
                </button>

              </div>
            </form>
          )}

          {/* STEP 3 */}
          {step === 'confirmed' && confirmedReservation && (
            <div className="py-6 text-center space-y-5">

              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-bold font-serif text-stone-900">
                  Your Table is Reserved!
                </h3>

                {emailSent ? (
                  <p className="text-xs text-stone-500">
                    Confirmation email sent to{' '}
                    <span className="font-semibold text-stone-800">
                      {confirmedReservation.guestEmail}
                    </span>
                  </p>
                ) : (
                  <p className="text-xs text-red-600">
                    {emailError}
                  </p>
                )}
              </div>

              <div className="max-w-md mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left space-y-3">

                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <div>
                    <div className="text-[10px] text-stone-400 font-bold uppercase">
                      Booking Reference
                    </div>

                    <div className="text-base font-mono font-bold text-amber-700">
                      {confirmedReservation.bookingRef}
                    </div>
                  </div>

                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                    Confirmed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">

                  <div>
                    <span className="text-stone-400 block text-[10px]">
                      Restaurant
                    </span>

                    <span className="font-bold text-stone-900">
                      {confirmedReservation.restaurantName}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[10px]">
                      Date & Time
                    </span>

                    <span className="font-bold text-stone-900">
                      {confirmedReservation.date} at{' '}
                      {confirmedReservation.timeSlot}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[10px]">
                      Guests
                    </span>

                    <span className="font-bold text-stone-900">
                      {confirmedReservation.guests} Guests
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[10px]">
                      Seating Area
                    </span>

                    <span className="font-bold text-stone-900">
                      {confirmedReservation.seatingArea}
                    </span>
                  </div>

                </div>

                <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />

                  <span>
                    {confirmedReservation.restaurantAddress}
                  </span>
                </div>

              </div>

              <div className="flex items-center justify-center pt-2">
                <button
                  onClick={onClose}
                  className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Done & Close
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}