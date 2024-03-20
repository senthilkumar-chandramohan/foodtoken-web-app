import { useState, useRef, useEffect } from 'react';
import codes from 'country-calling-code';

const CountryDropdown = ({countryCode, callingCode, setCountryCode, setCallingCode}) => {
  const [showDropdown, setShowDropdown] = useState(false); 
  const dropdownRef = useRef<HTMLSelectElement>(null);

  const updateCountrySelection = (e) => {
    const dropdown = e.target;
    setCountryCode(dropdown.value);

    if (dropdown.selectedOptions) {
      setCallingCode(dropdown.selectedOptions[0].getAttribute('data-calling-code'));
    } else {
      setCallingCode(dropdown.getAttribute('data-calling-code'));
    }
    toggleCountrySelection();
  }

  const toggleCountrySelection = () => {
    setShowDropdown(!showDropdown);
  }

  useEffect(() => {
    // Focus the dropdown when it's rendered
    if (dropdownRef.current) {
      dropdownRef.current.focus();
    }
  }); // Empty dependency array ensures this effect runs only once after the component is mounted


  return (
    <div className="country-dropdown container">
      <button className={`flag ${countryCode}`} onClick={toggleCountrySelection}>+{callingCode}</button>
      {
        showDropdown &&
          <select ref={dropdownRef} size={10} className="country" value={countryCode} onClick={updateCountrySelection} onBlur={updateCountrySelection} onChange={updateCountrySelection}>
            { codes.map(code => <option key={code.country} value={code.isoCode2} data-calling-code={code.countryCodes[0]}>{code.country} ({code.countryCodes[0]})</option>) }
          </select>
      }
    </div>
  )
}

export default CountryDropdown;
