import { Image } from "react-native";
import { ImageProps } from "@/types/types";

const ThemeImg: React.FC<ImageProps> = ({ source, style, resizeMode }) => {
  {
    return <Image source={source} style={[style || {}, { resizeMode }]} />;
  }
};

export default ThemeImg;
