import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FlatList, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import actions from '../store/actions/index';
import HouseLotCard from '../components/house/HouseLotCard';
import BgMessage from '../components/bgmessage/BackgroundMessage';

class HouseLotsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.fetchHouses = this.fetchHouses.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this.fetchHouses();
  }

  fetchHouses() {
    const { onFetchHouseLots, filters } = this.props;
    onFetchHouseLots(filters);
  }

  handleRefresh() {
    this.fetchHouses();
  }

  render() {
    const { houseLots, isFetching } = this.props;
    if (!houseLots.length && isFetching) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
      <FlatList
        data={houseLots}
        renderItem={({ item }) => <HouseLotCard item={item} />}
        keyExtractor={item => item.id.toString()}
        onRefresh={this.handleRefresh}
        onEndReached={this.handleScrollEnd}
        onEndReachedThreshold={0}
        refreshing={isFetching}
        ListEmptyComponent={() => <BgMessage text="There are no houses" />}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.houseLotsReducers.isFetching,
    houseLots: state.houseLotsReducers.houseLots,
    filters: state.houseFilterReducers || {
      priceFrom: '50',
      priceTo: '500',
      roomsFrom: '1',
      roomsTo: '3',
    },
    page: state.houseLotsReducers.page,
    itemsPerPage: state.houseLotsReducers.itemsPerPage,
    error: state.houseLotsReducers.error ? state.houseLotsReducers.error : null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchHouseLots: filters => dispatch(actions.houseLotsActions.fetchHouseLots(filters)),
  };
}

HouseLotsContainer.propTypes = {
  onFetchHouseLots: PropTypes.func.isRequired,
  houseLots: PropTypes.arrayOf(PropTypes.any).isRequired,
  filters: PropTypes.objectOf(PropTypes.any).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HouseLotsContainer);
