"use client"
//editor page 
//uses pages/api/coderAPI/[problem].ts for problem list
import "./(styles)/codeStyle.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {CardResponseType} from "@/common/types/CardResponseType";
import DraggableComponents from './(components)/index.js'

import Draggable from 'react-draggable';
import React from 'react'
  
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
                   {problem?.number}. {problem?.name}
                </h1>

                <div className="problemBox">
                    <p>
                        {problem?.prompt}
                        <p></p>
                        <a href="/problems">Problem Page</a>

                    </p>
                </div>
                <div className="container1">
                <br></br>
                    <div>
    
                <Draggable>
                   <div className="draggable-item1">
                        <p>Block1</p>
                   </div>
                   
                </Draggable>
                <Draggable>
                   <div className="draggable-item2">
                        <p>Block2</p>
                   </div>
                   
                </Draggable>
                <Draggable>
                   <div className="draggable-item3">
                        <p>Block3</p>
                   </div>
                   
                </Draggable>
                </div>
                    
                </div>
                <div className="container2">
                </div>
                <div className="inventoryHeader">
                    <header>Inventory:</header>
                    
                    
                </div>
                <div className="workSpaceHeader">
                    <header>Work Space:</header>
                </div>
                <div className="container5">
                    <p>
                       <div className="button1">Run</div>
                    </p>
                </div>
                <div className="container6">
                    <p>
                    <div className="button2">Clear</div>
                    </p>
                </div>


                <a href="index.html">
                    Click here to go back to problem list
                </a>
            </div>
        </body>
    );
}
