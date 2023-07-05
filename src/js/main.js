const submitBtn = document.getElementById('submit');
const inputContainer = document.getElementsByClassName('input-container')[0];
const liftSimulationContainer = document.getElementsByClassName(
  'lift-simulation-container'
)[0];

let floors = 0;
let lifts = 0;

submitBtn.addEventListener('click', () => {
  const noOfFloors = document.getElementById('floors');
  const noOfLifts = document.getElementById('lifts');
  floors = noOfFloors.value;
  lifts = noOfLifts.value;

  if (floors === '' || floors === 0 || lifts === '') {
    alert('Please enter the number of floors and lifts!');
  } else {
    liftSimulationContainer.classList.remove('hide');
    inputContainer.classList.add('hide');
  }
});
