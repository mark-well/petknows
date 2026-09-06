import CutomIconButton from "@/shared/components/CustomIconButton";
import React from "react";

type Props = {
  icon1: React.ReactNode;
  icon2: React.ReactNode;
  toggle?: boolean;
  onPress?: () => void;
};

// If toggle is true the first icon is shown otherwise the second icon is shown
export default function ToggleTwoIconButtons({ icon1, icon2, toggle = true, onPress }: Props) {
  if (toggle) {
    return <CutomIconButton onPress={onPress} icon={icon1} />;
  } else {
    return <CutomIconButton onPress={onPress} icon={icon2} />;
  }
}
