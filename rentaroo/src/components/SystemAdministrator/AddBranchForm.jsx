import React, { useState } from 'react';

const AddBranchForm = ()=> {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('Canada');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [openingHours, setOpeningHours] = useState({
        Monday: { open: '', close: '' },
        Tuesday: { open: '', close: '' },
        Wednesday: { open: '', close: '' },
        Thursday: { open: '', close: '' },
        Friday: { open: '', close: '' },
        Saturday: { open: '', close: '' },
        Sunday: { open: '', close: '' },
      });
  
    const handleAddressChange = (e) => {
      setAddress(e.target.value);
    };
  
    const handleCityChange = (e) => {
      setCity(e.target.value);
    };
  
    const handleProvinceChange = (e) => {
      setProvince(e.target.value);
    };
  
    const handleCountryChange = (e) => {
      setCountry(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhoneNumber(e.target.value);
      };

    const handleHoursChange = (day, field, value) => {
        setOpeningHours((prevHours) => ({
          ...prevHours,
          [day]: {
            ...prevHours[day],
            [field]: value,
          },
        }));  
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({
        address,
        city,
        province,
        country,
        phoneNumber,
        openingHours,
      });
    };



    return(
        <><h1>Branch Form</h1><form onSubmit={handleSubmit}>
            <label>
                Address:
                <input type="text" value={address} onChange={handleAddressChange} />
            </label>
            <br />
            <label>
                City:
                <input type="text" value={city} onChange={handleCityChange} />
            </label>
            <br />
            <label>
                Province:
                <select value={province} onChange={handleProvinceChange}>
                    <option value="">Select Province</option>
                    <option value="Alberta">Alberta</option>
                    <option value="British Columbia">British Columbia</option>
                    <option value="Manitoba">Manitoba</option>
                    <option value="New Brunswick">New Brunswick</option>
                    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                    <option value="Nova Scotia">Nova Scotia</option>
                    <option value="Ontario">Ontario</option>
                    <option value="Prince Edward Island">Prince Edward Island</option>
                    <option value="Quebec">Quebec</option>
                    <option value="Saskatchewan">Saskatchewan</option>
                </select>
            </label>
            <br />
            <label>
                Country:
                <select value={country} onChange={handleCountryChange}>
                    <option value="Canada">Canada</option>
                </select>
            </label>

            <label> Phone Number: 
            <input type="text" value={phoneNumber} onChange={handlePhoneChange} /> 
            </label>
            <br />
            <label>Opening Hours:</label>
      <br />
      {Object.entries(openingHours).map(([day, { open, close }]) => (
        <div key={day}>
          <label>{day}:</label>
          <select value={open} onChange={(e) => handleHoursChange(day, 'open', e.target.value)}>
            <option value="">Select Opening Time</option>
            <option value="08:00">08:00 AM</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
            <option value="18:00">6:00 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="21:00">9:00 PM</option>
            <option value="22:00">10:00 PM</option>

        
          </select>
          <span> to </span>
          <select value={close} onChange={(e) => handleHoursChange(day, 'close', e.target.value)}>
            <option value="">Select Closing Time</option>
            <option value="08:00">08:00 AM</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
            <option value="18:00">6:00 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="21:00">9:00 PM</option>
            <option value="22:00">10:00 PM</option>
          </select>
          <br />
        </div>
      ))}
      <br />
           
           
            <button type="submit">Submit</button>
       
       
       
        </form></>


    );
};
export default AddBranchForm;