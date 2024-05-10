import PropTypes from "prop-types";

const FormLegend = ({ title }) => {
  return (
    <legend>
      {title} <span>* </span>
    </legend>
  );
};

FormLegend.propTypes = {
  title: PropTypes.string.isRequired,
};
export default FormLegend;
