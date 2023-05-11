import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import DropDown2, { VibeType2 } from "../components/DropDown2";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Github from "../components/GitHub";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import Script from "next/script";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [desc, setDesc] = useState("");
  const [lang, setLang] = useState<VibeType>("English");
  const [difficulty, setDifficulty] = useState<VibeType2>("Ask to the End");
  const [generatedDescs, setGeneratedDescs] = useState<string>("");
  const defultDesc = "Why do we dream?";

  console.log("Streamed response: ", { generatedDescs });
  let promptObj = {
    "English": "UK English",
    "中文": "Simplified Chinese",
    "繁體中文": "Traditional Chinese",
    "日本語": "Japanese",
    "Italiano": "Italian",
    "Deutsch": "German",
    "Español": "Spanish",
    "Français": "French",
    "Nederlands": "Dutch",
    "한국어": "Korean",
    "ភាសាខ្មែរ": "Khmer",
    "हिंदी": "Hindi",
    "Indonesian": "Indonesian",
  };
  let difficultyObj = {
    "Ask to the End": "Ask to the End",
    "Ask 3 Questions": "Ask 3 Questions",
  };
  let text = desc || defultDesc;

  const generateDesc = async (e: any) => {
    let prompt;
    if (difficultyObj[difficulty] == "Ask to the End") {
      prompt = `Pretend you are GPT-4 model. Your task is to automatically take turns asking and answering questions. We’ll begin with an initial question. Then go on answering and asking in this pattern:
    Question: The initial question
    Answer: The answer to the initial question
    Question: The question about the reason for the previous answer
    Answer: The answer to the previous question
    Question:
    Keep asking about the reason for the last answer. Stop only when the answer is "That's the way it is" or "We don't know for now". Each question and answer should be a single sentence with no more than 20 words. Add "Q: " before each question and "A: " before each answer.
    Ask and answer in ${
      promptObj[lang]
    } regardless of the language I use. Don’t show the translation process. Just write questions and answers in the destination language.
    Now, the initial question is: ${text}${text.slice(-1) === "." ? "" : "."}`;
    } else {
      prompt = `Pretend you are GPT-4 model. Whenever I ask you about a piece of knowledge, you should raise three questions and try to answer these three questions.
    These three questions should be asked according to the following ideas:
    1. Where does it come from? This question implies that the emergence of knowledge is not created out of thin air; it must have been born to solve a problem.
    2. What is it? This question implies what kind of knowledge it is itself. What solutions does it propose for the problem it aims to solve?
    3. Where is it going? This question implies what flaws exist in the knowledge itself regarding the resolution of the problem? What are its limitations? What is the future direction of development?
    Ask and answer in ${
      promptObj[lang]
    } regardless of the language I use. Don’t show the translation process. Just write questions and answers in the destination language.
    Now, the initial question is: ${text}${text.slice(-1) === "." ? "" : "."}`;
    }
    e.preventDefault();
    setGeneratedDescs("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      setError(true);
      setLoading(false);
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedDescs((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Ask2End</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Z15P1JF7L5"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Z15P1JF7L5');
        `}
      </Script>

      <Header />

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-2 sm:my-16">
        <h1 className="sm:text-4xl text-2xl max-w-1xl font-bold text-slate-900">Ask to the End</h1>
        <p className=" text-slate-400 mt-2">Ask anything, get the ultimate answer!</p>
        <div className="max-w-xl w-full my-10">
          <div className="flex mt-4 items-center space-x-3 mb-3">
            <span className="w-7 h-7 rounded-full bg-black text-white text-center leading-7">
              1
            </span>
            <p className="text-left font-medium">Write your question</p>
          </div>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={1}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black block"
            placeholder={"e.g. " + defultDesc}
          />
          <div className="flex my-4 items-center space-x-3">
            <span className="w-7 h-7 rounded-full bg-black text-white text-center leading-7">
              2
            </span>
            <p className="text-left font-medium">Select your language</p>
          </div>
          <div className="block">
            <DropDown vibe={lang} setVibe={(newLang) => setLang(newLang)} />
          </div>

          <div className="flex my-4 items-center space-x-3">
            <span className="w-7 h-7 rounded-full bg-black text-white text-center leading-7">
              3
            </span>
            <p className="text-left font-medium">Select Type</p>
          </div>
          <div className="block">
            <DropDown2
              vibe2={difficulty}
              setVibe2={(newDifficulty) => setDifficulty(newDifficulty)}
            />
          </div>

          <div className="md:flex sm:mt-6 mt-4 space-y-4 md:space-y-0 gap-4">
            {!loading && (
              <button
                className="bg-black md:flex-1 rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80 w-full"
                onClick={(e) => generateDesc(e)}
              >
                Generate answer
              </button>
            )}
            {loading && (
              <button
                className="bg-black md:flex-1 rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80 w-full"
                disabled
              >
                <LoadingDots color="white" style="large" />
              </button>
            )}
            <a
              href="https://magickpen.com/"
              className="pro-btn  block md:flex-1 border border-transparent rounded-xl font-medium px-4 py-2 w-full"
            >
              Try Writing Assistant &rarr;
            </a>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000 }} />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-4">
              {generatedDescs && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      The answer is
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto  whitespace-pre-wrap">
                    <div
                      className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border text-left"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedDescs);
                        toast("Text copied to clipboard", {
                          icon: "✂️",
                        });
                      }}
                    >
                      <p>{generatedDescs}</p>
                      <blockquote className="mt-4 text-sm border-l-4 border-slate-300 pl-3 text-slate-400">
                        ask2end.com
                      </blockquote>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
        {error && (
          <p className="text-gray-400 my-5">
            🚨 Server is busy, please try again later, or you can
            <a href="https://magickpen.com/" className="underline ml-1 hover:text-black">
            Try Writing Assistant
            </a>
            .
          </p>
        )}
        <div className="mt-2">
          <a
            href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fask2end.com%2F&via=lvwzhen&text=Ask2End&hashtags=ChatGPT"
            target="_blank"
            className="text-[#1da1f2] font-medium text-sm px-5 py-2.5 text-center inline-flex items-center hover:opacity-80"
          >
            <svg
              className="w-4 h-4 mr-2 -ml-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="twitter"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
              ></path>
            </svg>
            Share on Twitter
          </a>
        </div>
        <div className="my-5 max-w-xl w-full">
          <h2 className=" text-slate-400 mb-4">Our Products</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <li>
              <a
                href="https://magickpen.com/"
                className="flex px-2 items-center justify-center h-14 hover:bg-slate-50 rounded-lg hover:transition-all"
              >
                <img
                  className="h-6 object-contain"
                  src="/magickpen.svg"
                  alt="MagickPen - Write Anything in Seconds Just like Magick"
                />
              </a>
            </li>
            <li>
              <a
                href="https://better.avatarprompt.net/"
                className="flex px-2 items-center justify-center h-14 hover:bg-slate-50 rounded-lg hover:transition-all"
              >
                <img
                  className="h-6 object-contain"
                  src="/BetterPrompt.png"
                  alt="BetterPrompt - Make Your Midjourney Prompt Better!"
                />
              </a>
            </li>
            <li>
              <a
                href="https://openl.io/"
                className="flex px-2 items-center justify-center h-14 hover:bg-slate-50 rounded-lg hover:transition-all"
              >
                <img
                  className="h-6 object-contain"
                  src="/OpenL.png"
                  alt="OpenL - Amazing Translator, powered by AI"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.teach-anything.com/"
                className="flex px-2 items-center justify-center h-14 hover:bg-slate-50 rounded-lg hover:transition-all"
              >
                <img
                  className="h-6 object-contain"
                  src="/TeachAnything.png"
                  alt="Teach you Anything in seconds"
                />
              </a>
            </li>
            <li>
              <a
                href="https://sailboatui.com/"
                className="flex px-2 items-center justify-center h-14 hover:bg-slate-50 rounded-lg hover:transition-all"
              >
                <img className="h-6 object-contain" src="/sailboatui.svg" alt="Sailboat UI" />
              </a>
            </li>
            <li>
              <a
                href="https://www.buymeacoffee.com/lvwzhen"
                className="flex px-2 items-center justify-center h-14 hover:bg-slate-100 rounded-lg hover:transition-all border border-dashed border-slate-200 bg-slate-50"
              >
                <p className="h-6 leading-6">❤️ Your logo</p>
              </a>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
      <div className="p-5 text-center md:fixed right-0 bottom-10">
        <a
          href="https://www.producthunt.com/posts/ask2end?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-ask2end"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=393421&theme=light"
            alt="Teach&#0032;Anything - Teach&#0032;you&#0032;anything&#0032;in&#0032;seconds | Product Hunt"
            width="250"
            height="54"
          />
        </a>
      </div>
    </div>
  );
};

export default Home;

































