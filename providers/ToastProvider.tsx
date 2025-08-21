"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import 'react-toastify/dist/ReactToastify.css';

const ToastContainer = dynamic(() => import('react-toastify').then(mod => ({ default: mod.ToastContainer })), {
    ssr: false,
});

export default function ToastProvider() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastStyle={{
                backgroundColor: 'white',
                color: 'black',
                border: 'none',
                borderRadius: '8px'
            }}
        />
    );
}
