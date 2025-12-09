import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTheme } from "./contexts/theme-provider";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const handleToogleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className='cursor-pointer'
      onClick={handleToogleTheme}
    >
      {theme === "light" ? (
        <Moon
          color='#101828'
          size={19}
          // className='absolute h-[1.2rem] w-[1.2rem] scale-0  transition-all dark:scale-100 '
        />
      ) : (
        <Sun
          size={24}
          color='#ecc94b'
          // className='h-[1.2rem] w-[1.2rem] scale-100  transition-all dark:scale-0 '
        />
      )}

      <span className='sr-only text-gray-900'>Toggle theme</span>
    </Button>
  );
}
