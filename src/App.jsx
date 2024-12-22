import React from 'react';
import { useState } from 'react'
import './App.css'
import CompanyPortal from './CompanyPortal.jsx';
import ViewedSection from './ViewedSection.jsx';
import { ViewedContext } from './ViewedContext.jsx';

let addViewed

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewedUsers, setViewedUsers] = useState([]); // Updated to use React state directly

  const addUser = (user) => {
    // Update the state directly by appending new user
    setViewedUsers((prevViewedUsers) => {
      if (!prevViewedUsers.includes(user)) {
        return [...prevViewedUsers, user]; // Add new user if not already present
      }
      return prevViewedUsers; // Return the same array if the user is already viewed
    });
  };

  const removeUser = (user) => {
    setViewedUsers((prevViewedUsers) => {
      return prevViewedUsers.filter(item => item !== user); 
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(addCompanyData, 10)
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <table className="userNamesTable">
          <tbody>
            <tr id="userNameRow"></tr>
          </tbody>
        </table>
        <table className="userDataTable">
          <tbody>
            <tr id="userDataRow"></tr>
          </tbody>
        </table>
      </div>
      <br/>
      
      {
        addViewed = addUser
      }
      {/* Pass the context provider with viewedUsers from state */}
      <ViewedContext.Provider value={viewedUsers}>
        <ViewedSection onClick={removeUser} />
      </ViewedContext.Provider>

      <button onClick={openModal} className="companyBtn" id="companyBtn">
        Company details
      </button>
      
      {isModalOpen && (
        <CompanyPortal isOpen={isModalOpen} onClose={closeModal} id="companyPortal" />
      )}
    </>
  );
}

let selectedIndex = 0;
let data;

// Event listeners
document.addEventListener("DOMContentLoaded", async function() {
  data = await getResult();
  populateTable(data, addViewed);
});

// Fetch JSON data
async function getJSonFrom(url) {
  const response = await fetch(url);
  if (!response.ok) {
    console.log("Can't fetch data.");
    return;
  }
  return await response.json();
}

async function getResult() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const jsonObject = await getJSonFrom(url);
  return jsonObject;
}

// User Info
let userInfoTrs = [];

function createUserInfoTr(data, key) {
  const tr = document.createElement("tr");
  tr.innerText = `${key}: ${data[key]}`;
  return tr;
}

function addAllUserInfoTrs(data) {
  Object.keys(data).forEach(key => {
    if (key === "company") return;
    if (typeof data[key] === "string") {
      userInfoTrs.push(createUserInfoTr(data, key));
      return;
    }
    if (typeof data[key] === "object") {
      addAllUserInfoTrs(data[key]);
    }
  });
}

function showUserInfo(data) {
  userInfoTrs = [];
  const userDataTr = document.getElementById("userDataRow");
  userDataTr.innerHTML = '';
  addAllUserInfoTrs(data);
  userInfoTrs.forEach(tr => userDataTr.appendChild(tr));
}

// Populate table with usernames
function usernames(data) {
  return data.map(element => element["username"]);
}

function populateTable(data, addUser) {
  const usernamesOfUsers = usernames(data);
  const userNameTr = document.getElementById("userNameRow");

  usernamesOfUsers.forEach((element, index) => {
    const tr = document.createElement("tr");
    const button = document.createElement("button");
    button.onclick = () => {
      showUserInfo(data[index]);
      const companyBtn = document.getElementById("companyBtn");
      companyBtn.style.display = "flex";
      selectedIndex = index;

      // Use the addUser function passed to the populateTable function
      addViewed(element);
    };
    button.innerText = element;
    tr.appendChild(button);
    userNameTr.appendChild(tr);
  });
}

function addCompanyData() {
  const companyTr = document.getElementById("companyDetails");
  Object.keys(data[selectedIndex]["company"]).forEach(key => {
    companyTr.appendChild(createUserInfoTr(data[selectedIndex]["company"], key));
  });
}

export default App;
