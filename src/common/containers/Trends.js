import React, {Component, PropTypes} from 'react';
import Helmet from "react-helmet";
import {connect} from 'react-redux';
import {fetchTrends} from '../actions/Github';
import Error from '../components/Error';

@connect(
  state => ({
    trends: state.github.trends,
    loading: state.github.loading,
    error: state.github.error
  }),
  dispatch => ({
    fetchData: () => {
      dispatch(fetchTrends());
    }
  })
)
export default class Trends extends Component {
  static propTypes = {
    trends: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string,
    fetchData: PropTypes.func
  }
  render() {
    return (
      <div className="ui relaxed divided list">
        <Helmet title="React Github trends" />

        <h1>React Github trends</h1>

        { this.props.error ?
          (
            <Error title="Github error" message={this.props.error} />
          ) : null
        }

        { this.props.loading ?
          <div>loading..</div> :
          this.props.trends.map(function(trend, i) {
            return (
              <div className="item" key={i}>
                <i className="large github middle aligned icon"></i>
                <div className="content">
                  <a className="header">{trend.full_name}</a>
                  <div className="description">{trend.stargazers_count}</div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
