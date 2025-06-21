import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <h1 className={cn("text-xl font-semibold", font.className)}>{label}</h1>
      {/* <p className=" text-muted-foreground text-sm">{label}</p> */}
    </div>
  );
};
