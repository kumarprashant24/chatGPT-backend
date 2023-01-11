
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import { Configuration ,OpenAIApi } from 'openai';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
 

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)
 
app.use(
    cors({
      origin: "*",
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    })
  ); 
app.get('/', (req, res) => {

    res.send("hello world");
});
app.post('/', async(req, res) => {
    try {
        const question = req.body.question;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${question}`,
            temperature: 0.7,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
           
        })
        res.send({
            bot:response.data.choices[0].text
        })
    } catch (error) {
        res.send(error)
    }
});
app.listen(5000, () => {
    console.log("app is listening on 5000 port")
})