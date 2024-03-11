export const isDateDisabled = (date, unavailableDates) => {
    // Check if the date is in the unavailableDates array
    return !unavailableDates.some(unavailableDate => {
      const startDateTimestamp = new Date(unavailableDate.startDate).setHours(0, 0, 0, 0);
      const endDateTimestamp = new Date(unavailableDate.endDate).setHours(0, 0, 0, 0);
      const checkDateTimestamp = new Date(date).setHours(0, 0, 0, 0);
      // Check if the provided date falls within any of the reservation date ranges
      return checkDateTimestamp >= startDateTimestamp && checkDateTimestamp <= endDateTimestamp;
    });
  };
  
  export const isDateDisabledModify = (date, unavailableDates, currentReservationDates) => {
    // Check if the date is in the unavailableDates array
    return !unavailableDates.some(unavailableDate => {
      const startDateTimestamp = new Date(unavailableDate.startDate).setHours(0, 0, 0, 0);
      const endDateTimestamp = new Date(unavailableDate.endDate).setHours(0, 0, 0, 0);
      const checkDateTimestamp = new Date(date).setHours(0, 0, 0, 0);
      // Check if the provided date falls within any of the reservation date ranges
      return checkDateTimestamp >= startDateTimestamp && checkDateTimestamp <= endDateTimestamp;
    }) || currentReservationDates.some(reservationDate => {
      const currentTimestamp = new Date(reservationDate).setHours(0, 0, 0, 0);
      return currentTimestamp === new Date(date).setHours(0, 0, 0, 0);
    });
};
