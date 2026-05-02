import axios from "axios";


const apiUrl = process.env.REACT_APP_IP;


// ✅ generate cycle api

export const generateCycles = async (data) => {
    try {
        const response = await axios.post(`${apiUrl}/api/generate-cycles/`, data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message
    }
}


//// ✅ post create schedule api

export const createSession = async (data) => {
    try {
        const response = await axios.post(`${apiUrl}/api/sessions/`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        // ✅ Always throw actual backend error
        throw error.response?.data || { error: error.message };
    }
};

// ✅ clear all cycle api

export const deleteSchedule = async (data) => {
    try {
        const response = await axios.delete(`${apiUrl}/api/clear-cycles/`, {
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


// ✅ FOR GETING ALL THE cycle data
export const getCycleData = async (deviceId) => {
    try {
        const response = await axios.get(`${apiUrl}/api/sessions/`, {
            params: { device_id: deviceId },
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


// ✅ FOR GETING ALL THE WORKER

export const getWorkers = async (pondId) => {
    try {
        const response = await axios.get(`${apiUrl}/workerview/${pondId}/`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


// ✅ ABORT SESSION API
export const abortSession = async (data) => {
    try {
        const response = await axios.post(
            `${apiUrl}/api/abort-session/`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};




// ✅ FOR GETING ALL THE DEVICE-ID API

export const getDeviceId = async (pondId) => {
    try {
        const response = await axios.get(`${apiUrl}/deviceid_view/${pondId}/`, {
            params: { device_type: "Power Monitoring" }
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const getSessions = async (deviceId) => {
    try {
        const response = await axios.get(`${apiUrl}/api/sessions/`, {
        params: {
            device_id: deviceId
        }
     }
    );
    return response.data
    } catch(error) {
        console.error(error);
    }
}

// export const abortSession = async (sessionId) => {
//     try {
//         const response = await axios.post(`${apiUrl}/api/abort-session/`, {
//             session_id: sessionId 
//         },
//         {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         }
//     );
//     } catch(error) {
//         console.error(error)
//     }
// }