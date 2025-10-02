
interface CommonCardProps {
  image: string;
  title: string;
  subtitle: string;
  location: string;
  price: string;
  status?: string;
  className?: string;
}

export default function CommonCard({
  image,
  title,
  subtitle,
  location,
  price,
  status = "Available",
  className = "",
}: CommonCardProps) {
  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-lg bg-white w-full ${className}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-80 object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        />
        <span className="absolute top-3 right-3 bg-white text-green-600 text-xs font-medium px-3 py-1 rounded-full shadow">
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="bg-[#071b35] text-white p-5 rounded-b-2xl -mt-[5px]">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm">{subtitle}</p>

        <div className="flex justify-between items-center mt-4 border-t border-gray-600 pt-3">
          <span className="text-sm text-gray-300">{location}</span>
          <span className="font-semibold">{price}</span>
        </div>
      </div>
    </div>
  );
}
