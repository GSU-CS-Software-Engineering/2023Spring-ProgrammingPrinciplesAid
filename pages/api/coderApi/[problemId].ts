import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {problemId} = req.query;

    const blockList: string[] = ["int x = ", "String x = ", "double x =", "System.out.println(x)", "for(x = ; x < ; x ){", "}", "public static void Main(String[] args){"]
    //Storgae of Problems
    //Format problemID: ID for each problem, Name,promt, number:for display purposes, code: will expand to have specific problems to have specific blocks, answer
    if (typeof problemId === "string") {
        const problems: any = [{
            "problemId": 1,
            "name": 'Initialize Integer',
            "prompt": 'Displays an integer saved to a variable with the integer value being = 4.',
            "number": '1',
            "code": blockList,
            answer: '4'
        }
            , {"problemId": 2, 
            name: 'Initialize Double', 
            prompt: 'Displays a double saved to a variable.', 
            number: "2" ,"code": blockList, 
            asnwer:'12.0'
            }
            , {"problemId": 3, 
                name: 'Say Hello', 
                prompt: 'Please print "Hello World" to the console.', 
                number: "3" ,
                "code": blockList, 
                answer: 'Hello World'
            }
            , {
                "problemId": 4,
                name: 'Count to Three',
                prompt: 'Please print the numbers 1-5 line-by-line using a for loop.',
                number: "4"
                ,"code": blockList,
                answer: '1  2   3   4   5'
            }
            , {"problemId": 5, 
            name: 'Say Goodbye', 
            prompt: 'Please print "Goodbye World" to the console.', 
            number: "5" ,
            "code": blockList
            , answer: 'Goodbye World'
        }
            , {"problemId": 6, 
            name: 'Nested For Loop', 
            prompt: 'Testing nested for loop.',
             number: "6" ,
             "code": blockList
             , answer: '1,  1 2,    1 2 3,  1 2 3 4,    1 2 3 4 5'
            }];

        res.status(200).json(problems[parseInt(problemId)]);
    }
    res.status(422);
}