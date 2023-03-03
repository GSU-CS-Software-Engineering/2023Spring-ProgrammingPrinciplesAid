//This file contains the html for the cards used on problems/page.tsx

import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.css';
import "../(styles)/cardStyle.css";

interface propsType {
    problemId: number;
    name: string;
    prompt: string;
}

function Card(props: propsType) {
    return (
        <div className="card">
            <div className="card-body">
                <p>
                  {props.problemId}.  {props.name}
                </p>
                <p></p>
                <div className = "p1">
                  <p> {props.prompt}</p>
                </div>

                <div>
                    <ul>
                        <Link href={`/problems/${props.problemId}`}> Problem {props.problemId}</Link><br/>
                        <br/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Card;