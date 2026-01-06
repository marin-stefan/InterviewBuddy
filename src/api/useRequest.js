import React, { useState } from "react";

export function useRequest(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const sendRequest = async (body, options = {}) => {
        setError(null);

        try {
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                },
                ...options,
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return { sendRequest, data, error };
}
