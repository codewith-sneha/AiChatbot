import {OpenAI} from "openai";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY ||"AIzaSyA6frBPSiRP39KiaC6na-XejWij2farFpk" ,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export default openai;