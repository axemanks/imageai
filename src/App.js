import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { InputBox } from "./InputBox";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});
const openai = new OpenAIApi(configuration);

function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [number, setNumber] = useState("3");
  const [size, setSize] = useState("256x256");
  const [imageUrl, setImageUrl] = useState("");

  const generateImage = async () => {
    const imageParameters = {
      prompt: userPrompt,
      n: parseInt(number),
      size: size,
    };
    const response = await openai.createImage(imageParameters);
    const urlData = response.data.data[0].url;
    setImageUrl(urlData);
  };

  return (
    <main className="App">
      {imageUrl && <img src={imageUrl} className="image" alt="ai thing" />}
      <InputBox label={"Description - The more details the better"} setAttribute={setUserPrompt} />
      <InputBox label={"Amount (1 for now)"} setAttribute={setNumber} />
      <InputBox label={"Size (default 256x256)"} setAttribute={setSize} />
      <button className="main-button" onClick={() => generateImage()}>
        Generate Image
      </button>
    </main>
  );
}

export default App;
