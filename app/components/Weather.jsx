const React = require('react'),
      WeatherForm = require('WeatherForm'),
      WeatherMessage = require('WeatherMessage'),
      ErrorModal = require('ErrorModal'),
      openweathermap = require('openweathermap');


var Weather = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false
    }
  },
  handleSearch: function(location){
    var that = this;

    this.setState({
      isLoading: true,
      errorMessage: undefined,
      location: undefined,
      temp: undefined
    });

    openweathermap.getTemp(location).then(function (temp) {
      that.setState({
        location: location,
        temp: temp,
        isLoading: false
      });
    }, function (e) {
      that.setState({
        isLoading: false,
        errorMessage: e.message
      });

    });
  },
  componentDidMount: function(){
    var location = this.props.location.query.location;

    if (location && location.length > 0){
      this.handleSearch(location);
      window.location.has = '#/';
    }
  },
  componentWillReceiveProps: function(newProps){
    var location = newProps.location.query.location;

    if (location && location.length > 0){
      this.handleSearch(location);
      window.location.has = '#/';
    }
  },
  render: function(){
    var {isLoading, temp, location, errorMessage} = this.state;

    function renderMessage() {
      if (isLoading){
        return <h3 className="text-center">Fetching Weather...</h3>;
      } else if (temp && location) {
        return <WeatherMessage temp={temp} location={location}/>;
      }
    }

    function renderError(){
      if (typeof errorMessage === 'string'){
        return (
          <ErrorModal message={errorMessage}/>
        )
      }
    }

    return (
      <div>
        <h1 className="text-center page-title">Get Weather</h1>
        <WeatherForm onSearch={this.handleSearch}/>
        {renderMessage()}
        {renderMessage}
      </div>
    )
  }
});

module.exports = Weather;
