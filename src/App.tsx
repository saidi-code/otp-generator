import "./App.css";
import { Button } from "./components/ui/button";
import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "./components/Theme-toggle";
import { Copy, RefreshCw } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard-ts";
import { useTheme } from "./components/contexts/theme-provider";
import type {
  CopyToClipboardOptions,
  CopyToClipboardProps,
} from "react-copy-to-clipboard-ts";
import { Zoom, ToastContainer, toast } from "react-toastify";
function App() {
  const { theme } = useTheme();
  const [counter, setCounter] = useState(0);
  const [start, setStart] = useState(false);
  const [otp, setOtp] = useState("");
  const otpMessage = useRef("");
  const copyOptions: CopyToClipboardOptions = {
    debug: true,
    message: "Copied to clipboard.",
    format: "text/plain",
  };

  const onCopy: CopyToClipboardProps["onCopy"] = (text) => {
    if (!text) {
      toast.error("Click the button to generate a new OTP!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        transition: Zoom,
        theme: theme,
      });
      return;
    }
    toast.success("Copied.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      transition: Zoom,
      theme: theme,
    });
  };
  const handleGenerateOtp = () => {
    setStart(true);

    // Generate a 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(newOtp);
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
    <div className='max-w-[360px]  md:max-w-[720px] mx-auto'>
      <div
        className={`h-screen flex flex-col justify-between mx-auto py-4 md:py-4`}
      >
        <header
          className=' p-4 md:px-8   max-w-[360px]  md:max-w-[720px]  
      flex justify-between border-b border-gray-300 dark:border-gray-200/10 '
        >
          <h1 className='text-lg md:text-xl font-bold text-black dark:text-white  '>
            OTP Generator
          </h1>
          <ThemeToggle />
        </header>
        <main className=' max-w-[360px] p-4 md:p-8  md:max-w-[720px] flex-1 flex flex-col justify-between '>
          {/* OTP Display  */}

          <p className='font-black text-2xl sm:text-4xl text-black dark:text-gray-200'>
            Your One-Time Password
          </p>

          {<GenerateOtp value={otp} />}

          <div className=''>
            <div className='flex items-center justify-between gap-4 sm:gap-6 '>
              <p className='text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300'>
                Expires in
              </p>
              <p className='text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400'>
                25s
              </p>
            </div>
            {/* Progress Bar and Timer  */}

            <div className='my-3 h-3 sm:h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700'>
              <div
                className='h-3 sm:h-4 rounded-full bg-primary'
                style={{ width: `${(100 * counter) / 25}%` }}
              />
            </div>
            <div className='mb-8 sm:mb-16 flex items-center justify-between gap-4 sm:gap-6 '>
              <p className='text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400'>
                Remaining Time: {counter || 0}s
              </p>
            </div>
          </div>
        </main>

        {/* Action Buttons  */}
        <footer className='w-full sm:max-w-[360px] md:max-w-[720px]  p-4 md:p-8  flex flex-col gap-4 border-t border-gray-300 dark:border-gray-200/10'>
          <CopyToClipboard onCopy={onCopy} options={copyOptions} text={otp}>
            <Button
              variant={"default"}
              className='flex h-10 sm:h-12 w-full
            min-w-[84px] cursor-pointer
            items-center justify-center
            gap-2 overflow-hidden
            rounded-xl bg-primary
            px-4 sm:px-5 text-sm sm:text-base font-bold
            leading-normal tracking-[0.015em]
text-white dark:text-gray-900'
            >
              <span className='material-symbols-outlined text-gray-900 dark'>
                <Copy />
              </span>
              <span className='truncate'>Copy OTP</span>
            </Button>
          </CopyToClipboard>
          <Button
            disabled={start}
            onClick={handleGenerateOtp}
            variant={"outline"}
            className='flex h-10 sm:h-12 w-full min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-transparent px-4 sm:px-5 text-sm sm:text-base font-bold leading-normal tracking-[0.015em] text-primary'
          >
            <span className='material-symbols-outlined'>
              <RefreshCw />
            </span>
            <span className='truncate'>Generate New OTP</span>
          </Button>
        </footer>
        <ToastContainer />
      </div>
    </div>
  );
}
const GenerateOtp = ({ value }: { value: string }) => {
  const otp = value || "xxxxxx";
  const array1 = otp.slice(0, 3).split("");
  const array2 = otp.slice(3, 6).split("");

  return (
    <div className='flex gap-2 md:gap-4'>
      {array1?.map((item, index) => (
        <span
          className='h-12 w-12 md:h-24 md:w-24 flex items-center justify-center rounded-md border border-black dark:border-white  '
          key={index}
        >
          <strong className='text-2xl md:text-[48px] tracking-widest md:tracking-[0.2em] font-bold  text-gray-900 dark:text-white flex justify-center'>
            {item}
          </strong>
        </span>
      ))}
      <span className='flex-1 flex items-center justify-center text-center text-lg md:text-2xl'>
        -
      </span>
      {array2?.map((item, index) => (
        <span
          className='h-12 w-12 md:h-24 md:w-24 flex items-center justify-center rounded-md border border-black dark:border-white  '
          key={index}
        >
          <strong className='text-2xl md:text-[48px] tracking-widest md:tracking-[0.2em] font-bold  text-gray-900 dark:text-white flex justify-center'>
            {item}
          </strong>
        </span>
      ))}
    </div>
  );
};
export default App;
