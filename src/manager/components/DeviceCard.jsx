export default function DeviceCard({ icon, title }) {
  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex flex-col gap-3 px-4 py-3">
        <img
          src={icon}
          alt={title}
          className="w-12 h-12 object-contain"
        />
        <h4 className="text-sm font-semibold text-gray-800">
          {title}
        </h4>
      </div>

    
    </div>
  );
}
