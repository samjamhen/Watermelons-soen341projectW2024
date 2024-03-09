import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/TermsAndConditions.css';

const TermsAndConditions = () => {
    return (
        <div className="terms-container">
            <Header />
            <h1>Terms and Conditions</h1>
            
            <section>
                <h2>Eligibility</h2>
                <p>Users must be 25 years of age or older to rent a vehicle from Rentaroo.</p>
                <p>A valid driving license is required at the time of rental.</p>
            </section>
            
            <section>
                <h2>Reservation and Rental Process</h2>
                <p>Vehicles are subject to availability. Rentaroo reserves the right to refuse a rental request based on vehicle availability or user eligibility.</p>
                <p>Upon confirming your reservation, changes to the selected vehicle are not permitted. To select a different vehicle, you must cancel your current reservation and create a new one.</p>
                <p>Cancellation policies apply. Please refer to our cancellation policy section for details.</p>
            </section>
            
            <section>
                <h2>Use of Vehicles</h2>
                <p>Vehicles rented from Rentaroo are to be used strictly for lawful purposes. Any illegal use of the rented vehicles is strictly prohibited.</p>
                <p>Renters are responsible for any fines, tolls, or penalties incurred during the rental period.</p>
                <p>Rentaroo vehicles must not be used for racing, off-roading, or any activity that could cause excessive wear and tear.</p>
            </section>
            
            <section>
                <h2>Insurance and Liability</h2>
                <p>Renters are responsible for selecting an insurance option during the rental process. Rentaroo offers various levels of insurance coverage that renters can choose from.</p>
                <p>Rentaroo is not responsible for personal property left in the vehicle. Renters are encouraged to remove all personal belongings at the end of the rental period.</p>
            </section>
            
            <section>
                <h2>Fees and Payments</h2>
                <p>All rentals are subject to applicable taxes and fees as outlined during the booking process.</p>
                <p>Late returns may incur additional charges. Renters should return vehicles at the agreed-upon time to avoid extra fees.</p>
            </section>
            
            <section>
                <h2>Cancellation Policy</h2>
                <p>Reservations can be canceled up to 24 hours before the scheduled pickup time for a full refund.</p>
                <p>Cancellations made less than 24 hours before the scheduled pickup time may incur a cancellation fee.</p>
            </section>
            
            <section>
                <h2>Modifications to Terms and Conditions</h2>
                <p>Rentaroo reserves the right to modify these terms and conditions at any time. Continued use of Rentaroo's services after such changes will constitute acknowledgment and agreement of the modified terms and conditions.</p>
            </section>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
