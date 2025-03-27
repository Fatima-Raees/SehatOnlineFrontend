import { useEffect } from "react";
import { getAllDoctorSpecializations } from "../APIServices/users/usersAPI";

const TestAPIConnection = () => {
    useEffect(() => {
        const testConnection = async () => {
            const result = await getAllDoctorSpecializations();
            console.log("API Response:", result);
        };

        testConnection();
    }, []);

    return null; // No UI needed, just testing
};

export default TestAPIConnection;
