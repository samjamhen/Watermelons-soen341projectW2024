const sgMail = require('@sendgrid/mail');

const API_KEY = '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';

// Middleware to send confirmation email
sendConfirmationEmail = async (reservation) => {
    try {
        sgMail.setApiKey(API_KEY);
    
        const message = {
            to: `${reservation.email}`,
            from: 'rentaroo.hq@gmail.com',
            subject: 'Booking Confirmed',
            html: `<div className="confirmation-container">
            <h1>Reservation Confirmed!</h1>
            <p>Thank you, <b>${reservation.fullName}</b>, for booking with us.</p>
            <p>Your reservation details:</p>
            <ul>
              <li>Car: ${reservation.vehicle}</li>
              <li>Pick-up Date: ${new Date(reservation.pickupDate).toLocaleDateString()}</li>
              <li>Return Date: ${new Date(reservation.returnDate).toLocaleDateString()}</li>
              <li>Total Price: ${reservation.totalPrice}</li>
            </ul>
            <p>You can view all your reservations in the "My Reservations" tab in your account.</p>
          </div>`
        }
    
        await sgMail.send(message);
      } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw new Error('Error sending confirmation email');
      }
};

sendDeleteConfirmation = async (reservation) => {
    try {
        sgMail.setApiKey(API_KEY);
    
        const message = {
            to: `${reservation.email}`,
            from: 'rentaroo.hq@gmail.com',
            subject: 'Booking Deleted',
            html: `<div className="confirmation-container">
            <h1>Reservation Deleted!</h1>
            <p>Thank you, <b>${reservation.fullName}</b>, your reservation was succesfully deleted.</p>
            <p>Your deleted reservation details:</p>
            <ul>
              <li>Car: ${reservation.vehicle}</li>
              <li>Pick-up Date: ${new Date(reservation.pickupDate).toLocaleDateString()}</li>
              <li>Return Date: ${new Date(reservation.returnDate).toLocaleDateString()}</li>
              <li>Total Price: ${reservation.totalPrice}</li>
            </ul>
            <p>You can view all your reservations in the "My Reservations" tab in your account.</p>
          </div>`
        }
    
        await sgMail.send(message);
      } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw new Error('Error sending confirmation email');
      }
};

sendUpdatedConfirmation = async (reservation) => {
    try {
        sgMail.setApiKey(API_KEY);
    
        const message = {
            to: `${reservation.email}`,
            from: 'rentaroo.hq@gmail.com',
            subject: 'Booking Updated',
            html: `<div className="confirmation-container">
            <h1>Reservation Deleted!</h1>
            <p>Thank you, <b>${reservation.fullName}</b>, your reservation was succesfully updated.</p>
            <p>Your new updated reservation details:</p>
            <ul>
              <li>Car: ${reservation.vehicle}</li>
              <li>Pick-up Date: ${new Date(reservation.pickupDate).toLocaleDateString()}</li>
              <li>Return Date: ${new Date(reservation.returnDate).toLocaleDateString()}</li>
              <li>Total Price: ${reservation.totalPrice}</li>
            </ul>
            <p>You can view all your reservations in the "My Reservations" tab in your account.</p>
          </div>`
        }
    
        await sgMail.send(message);
      } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw new Error('Error sending confirmation email');
      }
};

sendDepositConfirmation = async (reservation) => {
    try {
        sgMail.setApiKey(API_KEY);
    
        const message = {
            to: `${reservation.email}`,
            from: 'rentaroo.hq@gmail.com',
            subject: 'Deposit Taken',
            html: `<div className="confirmation-container">
            <h1>Deposit Received!</h1>
            <p>Thank you, <b>${reservation.fullName}</b>, your deposit was succesfully taken.</p>
            <p>Your reservation details:</p>
            <ul>
              <li>Car: ${reservation.vehicle}</li>
              <li>Pick-up Date: ${new Date(reservation.pickupDate).toLocaleDateString()}</li>
              <li>Return Date: ${new Date(reservation.returnDate).toLocaleDateString()}</li>
              <li>Total Price: ${reservation.totalPrice}</li>
            </ul>
            <p>You can view all your reservations in the "My Reservations" tab in your account.</p>
          </div>`
        }
    
        await sgMail.send(message);
      } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw new Error('Error sending confirmation email');
      }
};
module.exports = { sendConfirmationEmail, sendDeleteConfirmation, sendUpdatedConfirmation, sendDepositConfirmation };