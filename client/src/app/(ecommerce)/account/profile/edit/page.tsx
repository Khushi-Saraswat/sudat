"use client";

import { useUpdateOrEditProfile } from "@/hooks/useUser";
import { useUserStore } from "@/stores/user.store";
import { ChangeEvent, useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  //alternatePhone: string;
  //dateOfBirth: string;
  //gender: string;
};

export default function ProfileEditForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "Gaurav",
    lastName: "Sharma",
    email: "gauravsharma23@gmail.com",
    //alternatePhone: "",
    //dateOfBirth: "",
    //gender: ""
  });

  
  const updateProfile = useUpdateOrEditProfile();
  const setUser = useUserStore((s) => s.setUser); // moved to top-level

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* const handleGenderChange = (gender: string) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  }; */

  // use of arrow function-call when save button is clicked
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("Submitting form");
    console.log(formData.firstName);
    console.log(formData.lastName);
    console.log(formData.email);

    updateProfile.mutate(
      {
        name: formData.firstName + " " + formData.lastName, // added space between names
        email: formData.email,
      },
      {
        onSuccess: (data) => {
          console.log("Profile updated:", data);
          setUser(data.user); // update Zustand store
        },
        onError: (error) =>
          console.error(`Failed to update profile: ${error}`),
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">General Information</h2>

        <div className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              FULL NAME
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              LAST NAME
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Phone Number */}
          {/*<div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              value="+91 9389152789"
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>*/}

          {/* Alternate Phone Number */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              ALTERNATE PHONE NUMBER
            </label>
            <input
              type="tel"
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleInputChange}
              placeholder="+91 Enter your alternate mobile number"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400"
            />
          </div>*/}

          {/* Date of Birth */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              DATE OF BIRTH (DD-MM-YYYY)
            </label>
            <input
              type="text"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              placeholder="dd-mm-yyyy"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400"
            />
          </div>*/}

          {/* Gender */}
          {/*<div>
            <label className="block text-sm font-medium text-gray-600 mb-4">
              GENDER
            </label>
            <div className="flex space-x-6">
              {["Male", "Female", "Not Specified"].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={() => handleGenderChange(option)}
                    className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>*/}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
          CANCEL
        </button>
        <button
          className="px-8 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors"
          onClick={handleSubmit}
        >
          SAVE
        </button>
      </div>
    </div>
  );
}
