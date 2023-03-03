"use client"
//editor page 
//uses pages/api/coderAPI/[problem].ts for problem list
import "./(styles)/codeStyle.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {CardResponseType} from "@/common/types/CardResponseType";

export default function Page({ params }: { params: { coder: number }}) {
    const [problem, setProblem] = useState<CardResponseType>();


    useEffect(() => {
        getProblemInfo();
    }, [])

    const getProblemInfo = async () => {
        await axios.get<CardResponseType>(`http://localhost:3000/api/coderApi/${params.coder - 1}`).then((response) => {
            setProblem(response.data);
        })
    }

    return (
        <body>
            <div className="text-2xl">
                <h1>
                    {problem?.name}
                </h1>

                <div className="problemBox">
                    <p>
                        {problem?.prompt}<br></br>
                        <a href="/problems">Problem Page</a>
                    </p>
                </div>
                <div className="container1">
                </div>
                <div className="container2">
                </div>
                <div className="container3">
                    <p>
                        Code Box
                    </p>
                </div>
                <div className="container4">
                    <p>
                        Sand Box
                    </p>
                </div>
                <div className="container5">
                    <p>
                        Place Stop Button Here
                    </p>
                </div>
                <div className="container6">
                    <p>
                        Place Run Button Here
                    </p>
                </div>


                <a href="index.html">
                    Click here to go back to problem list
                </a>
            </div>
        </body>
    );
}
