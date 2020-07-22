import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
// import "../../../styles/main.scss";

class AddressSearchField extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      address: "",
      currentAddress: this.props.initialValue ? this.props.initialValue : "",
    };
  }

  handleChange = (address) => {
    this.setState({ address });
    if (address === "") {
      this.props.onAddressSelect({});
    }
  };
  componentDidMount() {
    console.log(this.props);
  }
  handleSelect = async (address) => {
    this.setState({ address });
    const { input } = this.props;
    const { onChange } = input;
    try {
      onChange(address);
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      this.props.onAddressSelect({ ...latLng, detailedAddress: address });
    } catch (err) {
      console.log(err);
    }
  };
  showError = (error) => {
    console.log(error);
  };

  render() {
    let searchType = this.props.searchType ? this.props.searchType : "address";
    const searchOptions = {
      types: [searchType],
    };
    return (
      <PlacesAutocomplete
        value={
          this.props.initialValue ? this.props.initialValue : this.state.address
        }
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.showError}
        searchOptions={searchOptions}
        debounce={500}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <label>Address</label>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
                name: "detailedAddress",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                // console.log(suggestion);
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default AddressSearchField;
