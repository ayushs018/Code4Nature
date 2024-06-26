import React, { useState } from 'react';
import axios from 'axios';
import LocationDropDown from './LocationDropDown';
import TemperatureChart from './TemperatureChart';
import './stylesheet/TemperatureData.css';

const TemperatureData = () => {
  const [locationId, setLocationId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [avgData, setAvgData] = useState([]);
  const [minData, setMinData] = useState([]);
  const [maxData, setMaxData] = useState([]);
  const [error, setError] = useState('');

  const apiToken = 'YiOwuvLZwnXFInhsGizSMRFfNhsRrzdl';

  const fetchData = async (datatypeid) => {
    const url = 'https://www.ncei.noaa.gov/cdo-web/api/v2/data';

    const params = {
      datasetid: 'GHCND',
      locationid: locationId,
      startdate: startDate,
      enddate: endDate,
      datatypeid,
      units: 'metric',
      limit: 1000,
      offset: 1
    };

    try {
      const response = await axios.get(url, {
        headers: { token: apiToken },
        params
      });
      return response.data.results;
    } catch (err) {
      throw new Error('Error fetching data');
    }
  };

  const handleFetchData = async () => {
    if (!locationId) {
      setError('Invalid location ID');
      return;
    }

    setError('');

    try {
      const avgData = await fetchData('TAVG');
      const minData = await fetchData('TMIN');
      const maxData = await fetchData('TMAX');

      setAvgData(avgData);
      setMinData(minData);
      setMaxData(maxData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="temperature-data-container">
      <h1>Fetch Temperature Data</h1>
      <div className="formbody">
        <LocationDropDown onLocationSelect={setLocationId} />
        <div className="input-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button onClick={handleFetchData}>Fetch Data</button>
        {error && <p className="error-message">{error}</p>}
        {(avgData.length > 0 || minData.length > 0 || maxData.length > 0) && (
          <TemperatureChart
            avgData={avgData}
            minData={minData}
            maxData={maxData}
            height={526}  // specify the desired height
            width={790}   // specify the desired width
          />
        )}
      </div>
    </div>
  );
};

export default TemperatureData;
