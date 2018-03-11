import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

class Transactions extends React.Component {
  render() {
    return <div>Transactions</div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
  }, dispatch)
};

const mapStateToProps = ({ transactions }) => ({
  transactions
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);

