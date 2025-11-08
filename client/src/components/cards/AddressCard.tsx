// Address Card Component
interface AddressCardProps {
  name: string; 
    address: string;
    mobile: string;
    isHome?: boolean;
    onEdit: () => void;
    onRemove: () => void;
}
export default function AddressCard({ 
  name, 
  address, 
  mobile, 
  isHome = false, 
  onEdit, 
  onRemove 
}: AddressCardProps) {
  return (
    <div className="bg-white border shadow-lg border-gray-200 rounded-lg p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          {isHome && (
            <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
              HOME
            </span>
          )}
        </div>
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
      
      <div className="space-y-1">
        <p className="text-gray-700 text-md  leading-relaxed">
          {address}
        </p>
        <p className="text-gray-700 text-md ">
          <span className="font-medium">Mobile :</span> {mobile}
        </p>
      </div>
    </div>
  );
}
