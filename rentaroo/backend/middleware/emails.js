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

sendSpecimenChequeRequest = async (reservation) => {
    try {
        sgMail.setApiKey(API_KEY);

        const message = {
            to: `${reservation.email}`,
            from: 'rentaroo.hq@gmail.com',
            subject: 'Specimen Cheque Request',
            html: `<div className="confirmation-container">
            <h1>Specimen Cheque Request</h1>
            <p>Dear <b>${reservation.fullName}</b>,</p>
            <p>We hope this message finds you well. We're excited to inform you that your vehicle listing on <strong>Rentaroo</strong> has been booked by a prospective renter!</p>
            <p>To proceed with finalizing the rental transaction, we kindly ask you to submit a specimen cheque. The specimen cheque serves as a necessary step to verify your payment information and ensure a smooth and secure transaction process.</p>
            <p><strong>Here's what you need to do:</strong></p>
            <ol>
              <li>Prepare a specimen cheque.</li>
              <li>Ensure that the specimen cheque contains all necessary details, including your name, account number (if applicable), and any other relevant information.</li>
              <li>Scan or take a clear photo of the specimen cheque.</li>
            </ol>
            <p>Once you have the specimen cheque ready, please reply to this email with the scanned copy or photo attached. Our team will review the information provided and proceed with finalizing the rental transaction.</p>
            <p>We understand that this additional step may seem unfamiliar, but please rest assured that it's a standard procedure to ensure the security and reliability of our rental platform.</p>
            <p>Should you have any questions or concerns regarding the submission of the specimen cheque or any other aspect of the rental process, feel free to reach out to us. We're here to assist you every step of the way.</p>
            <p>Thank you for choosing <strong>Rentaroo</strong> for your vehicle rental needs. We greatly appreciate your cooperation and look forward to facilitating a successful rental experience for you.</p>
            <p>Best regards,</p>
            `
        };

        await sgMail.send(message);
      } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw new Error('Error sending confirmation email');
      }
};


module.exports = { sendConfirmationEmail, sendDeleteConfirmation, sendUpdatedConfirmation, sendDepositConfirmation, sendVehicleReturnConfirmation, sendDepositReturnConfirmation };