const isAvailable = (from, to, listing) => {
    const { availability } = listing;
    const availableFrom = new Date(availability.from);
    const availableTo = new Date(availability.to);
    // const { from: checkIn, to: checkOut } = dates;
    const checkIn = new Date(from);
    const checkOut = new Date(to);

    if (!checkIn && !checkOut) {
        return true;
    }

    // Handles check-in only
    if (checkIn && !checkOut) {
        return checkIn >= availableFrom && checkIn <= availableTo;
    }

    // Handles check-out only
    if (!checkIn && checkOut) {
        return checkOut <= availableTo && checkOut >= availableFrom;
    }

    return availableFrom <= checkIn && availableTo >= checkOut;
};

module.exports = isAvailable;
