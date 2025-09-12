import {Configuration, OpenAIApi} from "openai";
import dotenv from "dotenv";

dotenv.config();

const OpenAIApiKey = process.env.OPENAI_API_KEY

if(!OpenAIApiKey){
    console.error('OPENAI_API_KEY is not set')
    process.exit(1)
}

const configuration = new Configuration({
    apikey: OpenAIApiKey
})

const openai = new OpenAIApi(configuration)

export default openai