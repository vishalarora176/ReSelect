import { useState } from 'react';
import './App.css';
import Select from './ui-components/select/Select';

function App() {

  const dropdownData = [
    {
      value: 'sedan',
      label: 'Sedan',
      description: 'A sedan has four doors and a traditional trunk',
      group: 'a'
    },
    {
      value: 'sports-car',
      label: 'Sports Car',
      description: 'These are the sportiest, hottest, coolest-looking coupes and convertibles—low to the ground, sleek, and often expensive.',
      group: 'c'
    },
    {
      value: 'coupe',
      label: 'Coupe',
      description: 'A coupe has historically been considered a two-door car with a trunk and a solid roof.',
      group: 'a'
    },
    {
      value: 'station-wagon',
      label: 'Station Wagon',
      description: 'Wagons are similar to sedans but have an extended roofline and a hatch door at the rear instead of a trunk.',
      group: 'b'
    },
    {
      value: 'pickup',
      label: 'Pickup Truck',
      description: 'A pickup truck has a passenger cab and an open cargo bed in the rear.',
      group: 'b'
    },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState({});

  function handleSelectionChange(selectedItem) {
    setSelectedMenuItem(selectedItem);
  }

  return (
    <div className="App">
      <Select 
        data={dropdownData} 
        extended={true} 
        theme='dark' 
        title='Types of Cars'
        onChange={handleSelectionChange}
      />
      {
        selectedMenuItem.label &&
        <h2>Selected Item: {selectedMenuItem.label}</h2>
      }
    </div>
  );
}

export default App;
