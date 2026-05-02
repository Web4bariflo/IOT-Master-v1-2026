import { useEffect, useState } from "react";
import axios from "axios";

const BASEURL = process.env.REACT_APP_IP;

const useDashboardData = (pondId, deviceType) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pondId || !deviceType) return;

    const fetchDevices = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${BASEURL}/deviceid_view/${pondId}/`,
          { params: { device_type: deviceType } }
        );

        const allDevices = res.data?.devices || res.data || [];

console.log("ALL DEVICES FULL:", JSON.stringify(allDevices, null, 2));

        // ✅ FILTER HERE (THIS IS THE FIX)
        const filteredDevices = allDevices.filter(
          (d) => d.device_type === deviceType
        );

        setDevices(filteredDevices);

      } catch (err) {
        console.error("Dashboard fetch error", err);
        setDevices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, [pondId, deviceType]);

  return { devices, loading };
};

export default useDashboardData;