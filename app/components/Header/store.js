import { connect } from 'react-redux';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  actions: {},
});

export default comp => connect(mapStateToProps, mapDispatchToProps)(comp);
