import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    occupation: "",
    State: ""
  });
  const [occupations, setOccupations] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    axios.get("https://frontend-take-home.fetchrewards.com/form")
      .then((res) => {
        setOccupations(res.data.occupations);
        setStates(res.data.states);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

     axios.post("https://frontend-take-home.fetchrewards.com/form", formData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error))

    setFormData({ 
      fullName: "",
      email: "",
      password: "",
      occupation: "",
      State: "",
   });
  };

  return (
    <div className="bg-black-200 h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
        method="post"
      >
        <div className="rounded flex-auto" id="userCreationForm">
        <h1 className="subpixel-antialiased text-2xl text-blue-600 
        font-bold mb-4 font-serif">User Creation Form</h1>
          <div className="mb-4">
            <label
              className="block text-black font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="border p-2 rounded-lg w-full bg-slate-700 "
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-black font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border p-2 rounded-lg w-full bg-slate-700"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-black font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border p-2 rounded-lg w-full bg-slate-700"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex mb-4">
            <div className="flex-auto mr-4" id="occupationDiv">
              <label>Occupation:</label>
              <select name = "occupation" 
              className="bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              value={formData.occupation} 
              onChange={handleChange}
              required>
                <option value="">Select an Occupation</option>
                {occupations.map((job, index) => {
                  return(
                    <option key={index} value={job}>{job}</option>
                  )
                  })}
              </select>
            </div>
            <div className="flex-auto" id="stateDiv">
              <label>State:</label>
              <select name = "State" 
              className="bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              value={formData.State} 
              onChange={handleChange}
              required>
                <option value="">Select a State</option>
                {states.map((States, index) => {
                  return (
                    <option key={index} value={States.abbreviation}>{States.name}</option>
                  )
                  })}
              </select>
            </div>
          </div>
          <button className="rounded-full border-slate-100 bg-slate-700" type="submit" onSubmit={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  )}

  export default CreateUserForm;