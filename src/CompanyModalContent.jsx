import React from 'react';

export default function CompanyModalContent({onClose}) {
  return (
      <div className = "modal">
           <br/>
           <br/>
           <div>
              <table>
                  <tbody>
                      <tr id = "companyDetails" className="companyDetails"></tr>
                  </tbody>
              </table>
          </div>
          <br/>
          <button onClick={onClose} className="closeBtn">Close Modal</button>
      </div>
  )
}