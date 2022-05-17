import React from "react";
import Options from "../Options/Options";

const GeneralOptions = (props) => {
  const options = [
    {
      name: "would you like to write a review?",
      handler: props.actionProvider.handleMessageParserDocs,
      id: 1,
    },
    {
      name: `where can i see the cast of movie/Tv series?`,
      handler: props.actionProvider.handleConfigDocs,
      id: 2,
    },
    {
      name: "How to search a movie or Tv Series?",
      handler: props.actionProvider.handleActionProviderDocs,
      id: 3,
    },
    {
      name: "I am unable to rate movie?",
      handler: props.actionProvider.handleWidgetDocs,
      id: 5,
    },
  ];

  return <Options options={options} />;
};

export default GeneralOptions;
