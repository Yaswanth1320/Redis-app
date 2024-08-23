"use client";
import { MoonIcon, SunIcon, Volume2, VolumeX } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { usePreference } from "@/store/usePreferences";
import { useSound } from "use-sound";

const MenuTab = () => {
  const { setTheme } = useTheme();
  const { soundEnabled, setSoundEnabled } = usePreference();
  const [mouseCLick] = useSound("/sounds/clicky-mouse-click.mp3");
  const [soundOn] = useSound("/sounds/unmute.mp3", { volume: 0.3 });
  const [soundOff] = useSound("/sounds/sound-off.mp3", { volume: 0.3 });

  return (
    <div className="flex flex-wrap px-1 md:px-2 gap-2">
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => {
          setTheme("light");
          soundEnabled && mouseCLick();
        }}
      >
        <SunIcon className="size-[1.2rem] text-muted-foreground" />
      </Button>
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => {
          setTheme("dark");
          soundEnabled && mouseCLick();
        }}
      >
        <MoonIcon className="size-[1.2rem] text-muted-foreground" />
      </Button>
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => {
          setSoundEnabled(!soundEnabled);
          soundEnabled ? soundOff() : soundOn();
        }}
      >
        {soundEnabled ? (
          <Volume2 className="size-[1.2rem] text-muted-foreground" />
        ) : (
          <VolumeX className="size-[1.2rem] text-muted-foreground" />
        )}
      </Button>
    </div>
  );
};

export default MenuTab;
