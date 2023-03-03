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
                    {props.name}
                </p>
                <p>
                    {props.prompt}
                </p>

                <div>
                    <ul>
                        <Link href={`/problems/${props.problemId}`}> Problem</Link><br/>
                        <br/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Card;