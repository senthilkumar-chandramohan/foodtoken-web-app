import { useState, useEffect } from 'react';
import codes from 'country-calling-code';

const CountryDropdown = ({countryCode, callingCode, setCountryCode, setCallingCode}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const updateCountrySelection = (e) => {
    const dropdown = e.target;
    setCountryCode(dropdown.getAttribute('data-value'));
    setCallingCode(dropdown.getAttribute('data-calling-code'));
    toggleCountrySelection();
  }

  const toggleCountrySelection = () => {
    setShowDropdown(!showDropdown);
  }

  useEffect(() => {
    const list = document.getElementById('country');
    if (list) {
      const index = codes.findIndex(item => item.isoCode2 === countryCode);
      const listItemToScrollTo = list.getElementsByTagName('li')[index];
      list.scrollTop = listItemToScrollTo.offsetTop;
    }
  }); // Empty dependency array ensures this effect runs only once after the component is mounted

  return (
    <div className="country-dropdown container">
      <button className={`flag ${countryCode}`} onClick={toggleCountrySelection}>+{callingCode}</button>
      {
        showDropdown &&
          <ul className="country" id="country">
            { codes.map(code => <li className={code.isoCode2 === countryCode ? 'selected' : ''} key={code.country} data-value={code.isoCode2} data-calling-code={code.countryCodes[0]} onClick={updateCountrySelection}>{code.country} ({code.countryCodes[0]})</li>) }
          </ul>
      }
    </div>
  )
}

export default CountryDropdown;
