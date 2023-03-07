import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {problemId} = req.query;

    if (typeof problemId === "string") {
        const problems: any = [{ "problemId": 1, "name": 'Initialize Integer', "prompt": 'Displays an integer saved to a variable.',"number": '1'}
    , { "problemId": 2, name: 'Initialize Double', prompt: 'Displays a double saved to a variable.', number: "2"}
  ,{ "problemId": 3, name: 'Say Hello', prompt: 'Please print "Hello World" to the console.', number: "3"}
  ,{ "problemId": 4, name: 'Count to Three', prompt: 'Please print the numbers 1-3 line-by-line using a for loop.', number: "4"}
  ,{ "problemId": 5, name: 'Say Goodbye', prompt: 'Please print "Goodbye World" to the console.', number: "5"}
  ,{ "problemId": 6, name: 'Nested For Loop', prompt: 'Testing nested for loop.', number: "6"}];
        res.status(200).json(problems[parseInt(problemId)]);

    }
}