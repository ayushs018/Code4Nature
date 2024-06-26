import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './stylesheet/LocationDropDown.css';

const LocationDropDown = ({ onLocationSelect }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState('');

  const apiToken = 'YiOwuvLZwnXFInhsGizSMRFfNhsRrzdl';

  useEffect(() => {
    const fetchCountries = async () => {
      const url = 'https://www.ncei.noaa.gov/cdo-web/api/v2/locations';
      const params = {
        locationcategoryid: 'CNTRY',
        sortfield: 'name',
        sortorder: 'asc',
        limit: 1000
      };

      try {
        const response = await axios.get(url, {
          headers: { token: apiToken },
          params
        });
        setCountries(response.data.results);
      } catch (err) {
        setError('Error fetching countries');
      }
    };

    fetchCountries();
  }, [apiToken]);

  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    setSelectedCity('');
    setCities([]);

    const url = 'https://www.ncei.noaa.gov/cdo-web/api/v2/locations';
    const params = {
      locationcategoryid: 'CITY',
      sortfield: 'name',
      sortorder: 'asc',
      limit: 1000,
      datacategoryid: countryId
    };

    try {
      const response = await axios.get(url, {
        headers: { token: apiToken },
        params
      });

      const filteredCities = response.data.results.filter((city) =>
        city.name.split(",")[1].includes(countryId.split(":")[1])
      );

      setCities(filteredCities);
    } catch (err) {
      setError('Error fetching cities');
    }
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    onLocationSelect(cityId);
  };

  return (
    <div className="location-dropdown-container">
      {error && <p className="error-message">{error}</p>}
      <div className="input-container">
        <label htmlFor="country">Select Country:</label>
        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">--Select Country--</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      {
        selectedCountry ? 
        <div className='input-container'>
          <label className='label' htmlFor="city">Select City:</label>
          <select id="city" value={selectedCity} onChange={handleCityChange}>
            <option className='optiontext' value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div> : 
        <div className='input-container'>
          <label htmlFor="city">Select City:</label>
          <select id="city" value={selectedCity} onChange={handleCityChange}>
            <option value="">Select Country First</option>
          </select>
        </div>
      }
    </div>
  );
};

export default LocationDropDown;
