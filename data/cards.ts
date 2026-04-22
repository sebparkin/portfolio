import { ImageSourcePropType } from "react-native";

export type CardProps = {
  id: number;
  title: string;
  image: ImageSourcePropType;
  content: string;
  cardHeight?: number; 
  onExpand?: (id: number) => void;
}

export const cards: CardProps[] = [
  {
    id: 1,
    title: 'Nonogram Puzzle App',
    image: require('@/assets/images/nonogram.png'),
    content: 'A web-based nonogram game, where custom photos can be uploaded, converted into a puzzle grid, and played.',
  },
  {
    id: 2,
    title: 'Machine Learning Day Trading Bot',
    image: require('@/assets/images/trader_bot.png'),
    content: 'LTSM neural network models hooked up to the Alpaca trading API, with a Streamlit dashboard.',
  },
  {
    id: 3,
    title: 'Molecular Dynamics Simulation of the EGFR',
    image: require('@/assets/images/EGFR.png'),
    content: 'My Scientific Computing and Data Science (MSc) thesis, where I investigated the effects of cancer-related mutations on the communication pathways through the EGFR.',
  }
];