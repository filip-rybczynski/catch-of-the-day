// React
import PropTypes from "prop-types";

// Types
import { FormTabProps } from "./FormTab.interface";

export const FormTab = ({ index, activeTab, render }: FormTabProps) => {
  const isActive = index === activeTab;
  return <div hidden={!isActive}>{render(isActive)}</div>;
};

FormTab.propTypes = {
  props: PropTypes.shape({
    index: PropTypes.number.isRequired,
    activeTab: PropTypes.number.isRequired,
    render: PropTypes.func.isRequired,
  }),
};
