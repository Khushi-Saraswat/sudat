// Address Card Component
interface AddressCardProps {
  landmark: string;
  state: string;
  city: string;
  address1: string;
  pincode: string;
  isHome?: boolean;
  onEdit: () => void;
  onRemove: () => void;
}

export default function AddressCard({
  landmark,
  state,
  city,
  address1,
  pincode,
  isHome = true,
  onEdit,
  onRemove
}: AddressCardProps) {
  return (
    <div className="bg-white border shadow-lg border-gray-200 rounded-lg p-6 mb-4">
      
      {/* Header Row */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-medium text-gray-900">
            {isHome ? "HOME" : "ADDRESS"}
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onEdit}
            className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            EDIT
          </button>
          <button 
            onClick={onRemove}
            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            REMOVE
          </button>
        </div>
      </div>

      {/* Address Body */}
      <div className="space-y-1">
        <p className="text-gray-700 text-md leading-relaxed">
          {address1}, {landmark}, {city}, {state} - {pincode}
        </p>
      </div>
    </div>
  );
}
