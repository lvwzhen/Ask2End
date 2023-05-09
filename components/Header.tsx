import Image from "next/image";
import Link from "next/link";
import Github from "../components/GitHub";

export default function Header() {
  return (
    <header className="md:flex text-center justify-between items-center w-full mt-5 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3 mb-10 md:mb-0 justify-center">
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight flex items-center gap-2">
          <img src="logo.png" alt="Ask2End logo" className="w-12 h-12" />
          Ask2End
        </h1>
      </Link>
      <div>
        <div className="flex flex-wrap justify-center gap-2 items-center">
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
            href="https://twitter.com/lvwzhen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="currentColor">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
            </svg>
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







