import Image from "next/image";
import Link from "next/link";
import Github from "../components/GitHub";

export default function Header() {
  return (
    <header className="md:flex text-center justify-between items-center w-full mt-5 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3 mb-10 md:mb-0 justify-center">
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          🧑🏼‍🏫 Ask2End{" "}
          <small className=" font-medium text-base px-2 inline-block bg-fuchsia-500 text-white  rounded-full">
            GPT-3.5-turbo
          </small>
        </h1>
      </Link>
      <div>
        <div className="flex flex-wrap justify-center gap-3 items-center">
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-md bg-white text-sm text-gray-600 shadow-sm transition-colors hover:opacity-80"
            href="https://www.buymeacoffee.com/lvwzhen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/buymeacoffee.png" className="h-10" alt="" />
          </a>
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm transition-colors hover:bg-gray-100"
            href="https://github.com/lvwzhen/Ask2End"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
        </div>
      </div>
    </header>
  );
}

