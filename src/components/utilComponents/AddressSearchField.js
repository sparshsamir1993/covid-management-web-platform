import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { TextField } from "@material-ui/core";
import clsx from "clsx";
// import "../../../styles/main.scss";

class AddressSearchField extends React.Component {
  constructor(props) {
    super(props);
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
        style={{ width: "100%" }}
        onSelect={this.handleSelect}
        onError={this.showError}
        searchOptions={searchOptions}
        debounce={500}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              {...getInputProps({
                placeholder: "Search Places ...",
                className: clsx("location-search-input", this.props.className),
                name: "detailedAddress",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                      key: suggestion.description,
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
