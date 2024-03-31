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
            <h1>Reservation Updated!</h1>
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
            <h1>Thank You! Deposit Confirmed</h1>
            <h3>You can now take your rental vehicle.</h3>
            <p>Thank you, <b>${reservation.fullName}</b>, for your deposit. Your deposit has been successfully confirmed.</p>
            <br />
            <p>A fixed amount has been frozen of your credit card. The deposit will be returned to you upon return of the vehicle in the same state. Please not that damage fees will be added to your final paiment if you do not respect the conditions of your rental agreement (damages, late return, etc.).</p>
            <br />
            <p>Details of your deposit:</p>
            <ul>
              <li>Deposit amount: $500</li>
              <li>Damages: ${reservation.previousDamages}</li>
              <li>Total Price: ${reservation.updatedPrice}</li>
              <li>Timestamp: ${new Date().toLocaleString()}</li>
            </ul>
          </div>
          <Footer />
          </div>`
        }
    
        await sgMail.send(message);
      } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw new Error('Error sending confirmation email');
      }
};

sendVehicleReturnConfirmation = async (reservation) => {
    try {
        sgMail.setApiKey(API_KEY);
    
        const message = {
            to: `${reservation.email}`,
            from: 'rentaroo.hq@gmail.com',
            subject: 'Vehicle Returned',
            html: `<div className="confirmation-container">
            <h1>Vehicle Returned!</h1>
            <p>Thank you, <b>${reservation.fullName}</b>, your vehicle was succesfully returned.</p>
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

sendDepositReturnConfirmation = async (reservation) => {
    try {
        sgMail.setApiKey(API_KEY);
    
        const message = {
            to: `${reservation.email}`,
            from: 'rentaroo.hq@gmail.com',
            subject: 'Payment Confirmed & Deposit Returned',
            html: `<div className="confirmation-container">
            <h1>Thank You! Payment Confirmed</h1>
            <p>Thank you, <b>${reservation.fullName}</b>, for your payment. Your payment has been successfully confirmed.</p>
            <p>Your payment details:</p>
            <ul>
              <li>Rental Price: ${reservation.totalPrice}</li>
              <li>Damages: ${reservation.newDamages}</li>
              <li>Total Price: ${reservation.finalPrice}</li> 
              <li>Timestamp: ${new Date().toLocaleString()}</li>
            </ul>
          </div>`
        }
    
        await sgMail.send(message);
      } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw new Error('Error sending confirmation email');
      }
};

module.exports = { sendConfirmationEmail, sendDeleteConfirmation, sendUpdatedConfirmation, sendDepositConfirmation, sendVehicleReturnConfirmation, sendDepositReturnConfirmation };