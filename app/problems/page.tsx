"use client"
//problem page uses (components)/Card for loading card
//API call to pages\api/hello.ts for Card info to fill
import Card from './(components)/Card'
import 'bootstrap/dist/css/bootstrap.css';
import "./(styles)/cardStyle.css"
import {useState, useEffect} from "react";
import {CardResponseType} from "@/common/types/CardResponseType";
import axios from "axios";

export default function Home() {
    const [cardResponse, setCardResponse] = useState<CardResponseType[]>();

    useEffect(() => {
        getCardInfo();
    }, [])

    const getCardInfo = async () => {
        await axios.get<CardResponseType[]>('http://localhost:3000/api/hello').then((response) => {
            setCardResponse(response.data);
        })
    }

    return (
        <main>
            <h1>
               
                Programming Principles Tool
                
            </h1>

            <div className="container">
                {cardResponse !== undefined && cardResponse.map((data, index: number) => {
                    return (
                        <div className="col" key={index} >
                            <Card problemId={data.problemId} name={data.name} prompt={data.prompt}/>
                        </div>)
                })}

            </div>


        </main>
    )
}
