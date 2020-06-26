import React from "react";
import { connect } from "react-redux";
import loaderSVG from "../../assets/img/load.svg";
const Loader = (props) => {
  const { loading } = props;
  if (!loading) return null;
  return (
    <div className="loader-container">
      <div className="loader">
        <img srcSet={loaderSVG} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loading: state.loading.loading,
  };
};

export default connect(mapStateToProps)(Loader);
