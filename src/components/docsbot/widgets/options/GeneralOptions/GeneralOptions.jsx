import React from "react";
import Options from "../Options/Options";

const GeneralOptions = (props) => {
  const options = [
    {
      name: "Question 1",
      handler: props.actionProvider.handleMessageParserDocs,
      id: 1,
    },
    {
      name: "Question 2",
      handler: props.actionProvider.handleConfigDocs,
      id: 2,
    },
    {
      name: "Question 3",
      handler: props.actionProvider.handleActionProviderDocs,
      id: 3,
    },
    {
      name: "Question 4",
      handler: props.actionProvider.handleWidgetDocs,
      id: 5,
    },
  ];

  return <Options options={options} />;
};

export default GeneralOptions;
