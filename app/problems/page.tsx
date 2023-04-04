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
    // This block of code essentially pulls the information from the api and gets teh information form the cardResponseType interface
    const [cardResponse, setCardResponse] = useState<CardResponseType[]>();

    useEffect(() => {
        getCardInfo();
    }, [])

    const getCardInfo = async () => {
        await axios.get<CardResponseType[]>('http://localhost:3000/api/hello').then((response) => {
            setCardResponse(response.data);
        })
    }

    //line 35 creates a card for each entry in pages/hello.ts this is how we fill our conatiner with cards
    return (
        <main>
            <div className='home-containter'>
                <h1 className="title has-text-left p-2">Welcome to the Program Repair tool!</h1>
                <h2 className="h2">Please click on a problem below to be taken to a page where you can attempt to solve it.</h2>
            </div>
            
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
