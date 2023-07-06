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

  buildLiftSimulationUI(floors, lifts);

});

const buildLiftSimulationUI = (floors, lifts) => {
  const container = document.getElementsByClassName('floors-container')[0];
  let liftContainerWidth = null;

  for (let i = 0; i < floors; i++) {
    const floor = document.createElement('div');
    floor.className = 'floor';

    const floorButtonContainer = document.createElement('div');
    floorButtonContainer.className = 'floor-button-container';

    const upButton = document.createElement('button');
    upButton.className = 'floor-button';
    upButton.innerText = '🔼';

    const downButton = document.createElement('button');
    downButton.className = 'floor-button';
    downButton.innerText = '🔽';

    floorButtonContainer.appendChild(upButton);
    floorButtonContainer.appendChild(downButton);

    const liftContainer = document.createElement('div');
    liftContainer.className = 'lift-container';

    if (i === 0) {
      for (let j = 0; j < lifts; j++) {
        const lift = document.createElement('div');
        lift.className = `lift lift-${j + 1}` ;
        liftContainer.appendChild(lift);
      }
      console.log(liftContainerWidth);
    }

    // Setting the width of the grounf floor lift container to the other floor lift containers
    if (i !== 0) {
      liftContainer.style.width = liftContainerWidth + 'px';
      console.log(liftContainerWidth);
    }
    // liftContainer.style.width = liftContainerWidth + 'px';

    const floorNumber = document.createElement('div');
    floorNumber.className = 'floor-number';
    floorNumber.innerText = i === 0 ? 'G' : i;

    floor.appendChild(floorButtonContainer);
    floor.appendChild(liftContainer);
    floor.appendChild(floorNumber);

    container.appendChild(floor);
    if (i === 0) {
      liftContainerWidth = liftContainer.offsetWidth;
    }
    console.log(liftContainerWidth);
  }
};
