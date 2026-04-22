import { StyleProp, ViewStyle } from "react-native";
import React from "react";

export type ExpandCardProps = {
  id: number;
  title: string;
  video: number;
  content: React.ReactNode;
  cardHeight?: number; 
  handleClose?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
}

export const expandCards: ExpandCardProps[] = [
  {
    id: 1,
    title: 'Nonogram Puzzle App',
    video: require('@/assets/videos/nonogram.m4v'),
    content: (
      <>
      This is a web-based puzzle game I created with React Expo, complete with gesture handling, image handling and animations. {'\n\n'}
      The rules of the game are to fill up the squares so that the number of filled squares in each row and column line up with the clues on the top and the left of the grid. This project was a great way for me to learn front-end web development with both desktop and mobile support. {'\n\n'}
      <a href="https://nonogram-app.vercel.app/" target="_blank" rel="noopener noreferrer">Click here to play!</a>
      </>
    )
  },  
  {
    id: 2,
    title: 'Machine Learning Day Trading Bot',
    video: require('@/assets/videos/trading_bot.m4v'),
    content: (
      <>This project involves Python based LTSM models for both AAPL and MSFT to predict whether close will be higher or lower than open, based on the previous days hourly tickers.{'\n'}
      Feature engineering has been used to generate 53 features for prediction. A Streamlit frontend was developed to track how the bot is doing, and the bot has been hosted on Oracle Cloud. {'\n'}
      This project taught me about machine learning neural networks, streamlit integration and how to host applications with Oracle Cloud.{'\n\n'}
      <a href="http://193.123.189.238:8501" target="_blank" rel="noopener noreferrer">Click here to see the dashboard!</a>
      </>
    )
  },
  {
    id: 3,
    title: 'Molecular Dynamics Simulation of the EGFR',
    video: require('@/assets/videos/thesis.mp4'),
    content: (
      <>
      This was my thesis for my master's degree, which involved Non-Equilibrium Molecular Dynamics (NEMD) simulations on the Epidermal Growth Factor Receptor (EGFR). {'\n'}
      This receptor is implicated in cancers, the most common being non small cell lung cancer. {'\n'}
      First a long (500ns) equilibrium simualation was carried out, then a perturbation was made every 5ns and a non-equilibrium simulation was performed. {'\n'}
      By comparing the displacements between the equilibrium and non-equilibrium simulations we found the dynamical effects due to the mutation.
      </>
    )
  }
];


