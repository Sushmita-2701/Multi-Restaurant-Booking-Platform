import React from 'react';
import { Reservation } from '../types/restaurant';
import {
  X,
  CalendarCheck,
  MapPin,
  Clock,
  Users,
  AlertCircle,
  Trash2,
  Calendar,
  ExternalLink,
  UtensilsCrossed,
} from 'lucide-react';

interface BookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onCancelReservation: (id: string) => void;
  onExplore: () => void;
}

export default function BookingsDrawer({
  isOpen,
  onClose,
  reservations,
  onCancelReservation,
  onExplore,
}: BookingsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-600/10 text-amber-700 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold font-serif text-stone-900">My Reservations</h2>
                <p className="text-xs text-stone-500">
                  {reservations.length} Active {reservations.length === 1 ? 'Booking' : 'Bookings'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {reservations.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <UtensilsCrossed className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-stone-800">No Reservations Yet</h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1">
                    Explore top-rated restaurants, reserve your preferred table time, and enjoy guaranteed seating.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onExplore();
                  }}
                  className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Explore Restaurants
                </button>
              </div>
            ) : (
              reservations.map((res) => (
                <div
                  key={res.id}
                  className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3 relative group hover:border-amber-400/80 transition-all shadow-xs"
                >
                  {/* Restaurant Info & Status */}
                  <div className="flex items-start gap-3">
                    <img
                      src={res.restaurantImage}
                      alt={res.restaurantName}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-stone-900 text-sm truncate">
                          {res.restaurantName}
                        </h4>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                          Confirmed
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 truncate mt-0.5">{res.restaurantNeighborhood}</p>
                      <div className="text-[11px] font-mono font-bold text-amber-700 mt-1">
                        Ref: {res.bookingRef}
                      </div>
                    </div>
                  </div>

                  {/* Booking Details Matrix */}
                  <div className="bg-white rounded-xl p-3 border border-stone-200/80 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-medium text-stone-700">{res.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-medium text-stone-700">{res.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-medium text-stone-700">{res.guests} Guests</span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded truncate">
                        {res.seatingArea}
                      </span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="text-[11px] text-stone-500 flex items-start gap-1.5">
                    <MapPin className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                    <span className="leading-tight">{res.restaurantAddress}</span>
                  </div>

                  {/* Cancel Action */}
                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                    <span className="text-[10px] text-stone-400">Free cancellation</span>
                    <button
                      onClick={() => onCancelReservation(res.id)}
                      className="text-red-600 hover:text-red-700 text-xs font-semibold flex items-center gap-1 p-1 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Booking</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {reservations.length > 0 && (
            <div className="p-4 bg-stone-50 border-t border-stone-200">
              <button
                onClick={() => {
                  onClose();
                  onExplore();
                }}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Book Another Table
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
