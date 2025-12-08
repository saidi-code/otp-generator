import "./App.css";
import { Button } from "./components/ui/button";
import { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "./components/contexts/theme-provider";
import { ThemeToggle } from "./components/Theme-toggle";
import { Copy, RefreshCw } from "lucide-react";

import { CopyToClipboard } from "react-copy-to-clipboard-ts";
import { ToastContainer, toast } from "react-toastify";
function App() {
  const [counter, setCounter] = useState(0);
  const [start, setStart] = useState(false);
  const [otp, setOtp] = useState("");
  const [copied, setCopied] = useState(false);
  const otpMessage = useRef("");
  const copyOptions: CopyToClipboardOptions = {
    debug: true,
    message: "Copied to clipboard.",
    format: "text/plain",
  };
  const onCopy: CopyToClipboardProps["onCopy"] = (text, result) => {
    if (!text) {
      toast.error("Click the button to generate a new OTP!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    console.log(`Copied text: ${text}, Success: ${result}`);
    setCopied(true);
    // toast("Copied.");
    toast.success("Copied.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleGenerateOtp = () => {
    console.log("btn clicked");
    setStart(true);
    // setCounter(25); // reset countdown to 5 seconds

    // Generate a 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(newOtp);
    console.log("otp code", newOtp);
  };
  useEffect(() => {
    if (!start) return;

    const counterId = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 25) {
          clearInterval(counterId);
          otpMessage.current =
            "OTP expired. Click the button to generate a new OTP.";
          setStart(false);
          setCopied(false);
          setOtp("");
          return 0;
        }
        otpMessage.current = `Expires in: ${prev + 1} seconds`;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(counterId);
  }, [start]);
  return (
    <ThemeProvider defaultTheme='dark' storageKey='ui-theme'>
      <div className='h-screen w-screen flex flex-col justify-between '>
        <header className='w-[720px] mx-auto p-4 flex justify-between border-b border-gray-200/10 '>
          <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
            OTP Generator
          </h1>
          <ThemeToggle />
        </header>
        <main className='max-w-[720px] mx-auto flex-1 flex flex-col justify-between '>
          {/* OTP Display  */}

          <p className='my-16 text-3xl text-gray-800 dark:text-gray-200'>
            Your One-Time Password
          </p>

          <h2 className='text-[48px] mb-16 font-bold tracking-[0.2em] text-gray-900 dark:text-white'>
            {<GenerateOtp value={otp} />}
          </h2>

          <div className=''>
            <div className='flex items-center justify-between gap-6 '>
              <p className='text-base font-medium text-gray-700 dark:text-gray-300'>
                Expires in
              </p>
              <p className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                25s
              </p>
            </div>
            {/* Progress Bar and Timer  */}

            <div className='my-3 h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700'>
              <div
                className='h-4 rounded-full bg-primary'
                style={{ width: `${(100 * counter) / 25}%` }}
              />
            </div>
            <div className='mb-16 flex items-center justify-between gap-6 '>
              <p className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                Remaining Time: {counter || 0}s
              </p>
            </div>
          </div>
        </main>

        {/* Action Buttons  */}
        <footer className='w-[720px] mx-auto p-4 flex flex-col gap-2 border-t border-gray-200/10 pb-8'>
          <CopyToClipboard onCopy={onCopy} options={copyOptions} text={otp}>
            <Button
              variant={"default"}
              className='flex h-12 w-full 
            min-w-[84px] cursor-pointer 
            items-center justify-center 
            gap-2 overflow-hidden 
            rounded-xl bg-primary 
            px-5 text-base font-bold 
            leading-normal tracking-[0.015em]
             text-white bg-red-500'
            >
              <span className='material-symbols-outlined'>
                <Copy />
              </span>
              <span className='truncate'>Copy OTP</span>
            </Button>
          </CopyToClipboard>
          <Button
            disabled={start}
            onClick={handleGenerateOtp}
            variant={"ghost"}
            className='flex h-12 w-full min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-transparent px-5 text-base font-bold leading-normal tracking-[0.015em] text-primary'
          >
            <span className='material-symbols-outlined'>
              <RefreshCw />
            </span>
            <span className='truncate'>Generate New OTP</span>
          </Button>
        </footer>
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}
const GenerateOtp = ({ value }: { value: string }) => {
  const otp = value || "xxxxxx";
  const array1 = otp.slice(0, 3).split("");
  const array2 = otp.slice(3, 6).split("");
  // console.log("array1", array1);
  // console.log("array2", array2);
  return (
    <div className='flex gap-4'>
      {array1?.map((item, index) => (
        <span
          className='h-24 w-24 flex items-center justify-center rounded-md border border-white '
          key={index}
        >
          {item}
        </span>
      ))}
      <span className='text-center'>-</span>
      {array2?.map((item, index) => (
        <span
          className=' h-24 w-24 flex items-center justify-center rounded-md border '
          key={index}
        >
          {item}
        </span>
      ))}
    </div>
  );

  // return `${part1}-${part2}`;
};
export default App;
