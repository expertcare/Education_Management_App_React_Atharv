import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/contacts";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  return (
    <div className="container margin-top-bottom text-center">
      <h1 className="fs-2 my-4">Contact Us List</h1>
      <div className="table-responsive">
        {contacts.length === 0 ? (
          <p className="fs-4 m-5 animated-text">
            No one is trying to contact us
          </p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </td>
                  <td>{contact.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ContactList;
