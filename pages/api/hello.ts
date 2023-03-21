// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

//API that is used to fill cards on our front page problems/page.tsx
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json([{ "problemId": 1, "name": 'Initialize Integer', "prompt": 'Displays an integer saved to a variable.',"number": '1'}
    , { "problemId": 2, name: 'Initialize Double', prompt: 'Displays a double saved to a variable.', number: "2"}
  ,{ "problemId": 3, name: 'Say Hello', prompt: 'Please print "Hello World" to the console.', number: "3"}
  ,{ "problemId": 4, name: 'Count to Three', prompt: 'Please print the numbers 1-3 line-by-line using a for loop.', number: "4"}
  ,{ "problemId": 5, name: 'Say Goodbye', prompt: '"Goodbye World" to the console.', number: "5"}
  ,{ "problemId": 6, name: 'Nested For Loop', prompt: 'Testing nested for loop.', number: "6"}]);
}
