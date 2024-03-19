import React from 'react';
import "../../styles/BranchCard.css"



const AdminBranchCard = () => {


    const handleDelete = () => {
        // Implement delete functionality here
        console.log('Delete branch');
      };
    
      const handleModify = () => {
        // Implement modify functionality here
        console.log('Modify branch');
      };







return (
    <div className='branch-card'>
      
      <p className='city'>Admin City</p>
      <p className='address'>Admin Address</p>
      <a href="" className='hoursServices'>Hours and Services</a>


     <div className="admin-actions">
        <button onClick={handleModify}>Modify</button>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>

      </div>  
      
   
  );

}
export default AdminBranchCard;