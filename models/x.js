// POST /api/returns {customerId, movieId}

// Return 401 if client is not logged in --DONE
// Return 400 if customerId is not provided --DONE
// Return 400 if movieId is not provided --DONE
// Return 404 if no rental fouond for this customer/movie --DONE
// Return 400 if return already processed --DONE
// Return 200 if valid request --DONE
// Set the return date --DONE
// Calculate the rental fee (numberOfDays * movie.dailyRentalRate) --DONE
// Increase the stock --DONE
// Return the rental --DONE
