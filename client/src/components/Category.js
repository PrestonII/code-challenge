import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import Restaurant from './Restaurant';

const Cuisine = props => (
  <Link to={{
    pathname: `${props.match.url}/${props.cuisine_name}`,
    state: {
      cuisine_name: props.cuisine_name,
      cuisine_id: props.cuisine_id
    }
  }}>
    { props.cuisine_name }
  </Link>
);

export default withRouter(Cuisine);