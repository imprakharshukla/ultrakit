"use client"

import { Agentation } from "agentation";

export const AnnotationProdiver = () => {
    return (
        <>
            {
                process.env.NODE_ENV === "development" && <Agentation endpoint="http://localhost:4747"
                    onSessionCreated={(sessionId) => {
                        console.log("Session started:", sessionId);
                    }} />
            }
        </>
    )
}