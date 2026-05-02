
import sunImg from "../../../../assets/Images/SUN.png";
import humidityImg from "../../../../assets/Images/humidity.png";
import windImg from "../../../../assets/Images/wind.png";

export default function WeatherCard() {
    return (
        <div className="w-[220px] bg-[#e9edf2] rounded-xl shadow-md px-4 py-3 flex flex-col justify-between text-gray-700">
            {/* Top Section */}
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-[15px] font-medium leading-none">Monday</p>
                    <p className="text-[11px] text-gray-500">16 Dec, 2025</p>
                </div>

                {/* Humidity */}
                <div className="flex flex-col items-end">
                    <img
                        src={humidityImg}
                        alt="humidity"
                        className="w-[40px] h-[40px]"
                    />
                    <p className="text-[11px] leading-none mt-1">41%</p>
                    <p className="text-[10px] text-gray-700 leading-none">
                        Humidity
                    </p>
                </div>
            </div>

            {/* Temperature */}
            <div className="">
                <h1 className="text-[28px] font-semibold leading-none ">
                    24<span className="text-[28px] align-top">°C</span>
                </h1>
            </div>

            {/* Sun Image */}
            <div className="flex justify-center">
                <img
                    src={sunImg}
                    alt="sun"
                    className="w-[75px] h-[75px] object-contain"
                />
            </div>

            {/* Weather Text */}
            <div className="text-center">
                <p className="text-[15px] font-semibold leading-none">Sunny</p>
            </div>

            {/* Wind Section */}
            <div className="flex justify-end">
                <div className="flex flex-col items-end">
                    <img
                        src={windImg}
                        alt="wind"
                        className="w-[30px] h-[30px]"
                    />
                    <p className="text-[11px] leading-none mt-1">2km/h</p>
                    <p className="text-[10px] text-gray-700 leading-none">
                        Wind Speed
                    </p>
                </div>
            </div>
        </div>
    );
}