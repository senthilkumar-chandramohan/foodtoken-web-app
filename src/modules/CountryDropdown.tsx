import { useState } from 'react';
import codes from 'country-calling-code';

const CountryDropdown = ({countryCode, callingCode, setCountryCode, setCallingCode}) => {
  const [showDropdown, setShowDropdown] = useState(false); 

  const updateCountrySelection = (e) => {
    const dropdown = e.target;
    setCallingCode(dropdown.value);

    if (dropdown.selectedOptions) {
      setCountryCode(dropdown.selectedOptions[0].getAttribute('data-country-code'));
    } else {
      setCountryCode(dropdown.getAttribute('data-country-code'));
    }
    setShowDropdown(false);
  }

  const toggleCountrySelection = () => {
    setShowDropdown(!showDropdown);
  }

  return (
    <div className="country-dropdown container">
      <button className={`flag ${countryCode}`} onClick={toggleCountrySelection}>+{callingCode}</button>
      {
        showDropdown &&
          <select size={10} className="country" value={callingCode} onClick={updateCountrySelection} onBlur={updateCountrySelection} onChange={updateCountrySelection}>
            { codes.map(code => <option key={code.country} value={code.countryCodes[0]} data-country-code={code.isoCode2}>{code.country} ({code.countryCodes[0]})</option>) }
          </select> 
      }
    </div>
  )
}

export default CountryDropdown;
