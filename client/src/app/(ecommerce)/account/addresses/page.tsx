"use client";

import AddressCard from "@/components/cards/AddressCard";
import AddNewAddressForm from "@/components/models/AddAddresseModel";
import { getAddress } from "@/hooks/useUser";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function page() {

  const { data: address, isLoading, error } = getAddress();
  

  const [isOpen, setIsOpen] = useState(false);

  const handleAddNewAddress = () => setIsOpen(true);

  const handleEdit = () => {
    console.log("Edit address clicked");
  };

  const handleRemove = () => {
    console.log("Remove address clicked");
  };


   if(isLoading)
      return (
        <img src="/loaders/form_loader.gif" alt="Loading spinner" style={{ width: '100px' }}/>
      );

      if(error)
       return (
        <img src="/loaders/form_loader.gif" alt="Loading spinner" style={{ width: '100px' }}/>
      );
    
  return (
    <div className="w-[75%] p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Addresses</h1>
        <button 
          onClick={handleAddNewAddress}
          className="flex items-center space-x-2 text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          <Plus size={20} />
          <span className="text-sm font-bold">ADD NEW ADDRESS</span>
        </button>
      </div>



     



      {/* Address List */}
      <div className="space-y-4">
        { !isLoading && !error && address?.addresses?.map((add: any) => (
          <AddressCard
            key={add._id}
            address1={add.address1}
            landmark={add.landmark}
            city={add.city}
            state={add.state}
            pincode={add.pincode}
            isHome={add.type === "home"}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        ))}
      </div>

      {/* Add New Address Form */}
      <AddNewAddressForm setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
}
