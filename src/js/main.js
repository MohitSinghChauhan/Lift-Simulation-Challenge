const submitBtn = document.getElementById('submit');
const inputContainer = document.getElementsByClassName('input-container')[0];
const liftSimulationContainer = document.getElementsByClassName(
  'lift-simulation-container'
)[0];

let noOfFloors = 0;
let noOfLifts = 0;

submitBtn.addEventListener('click', () => {
  const noOfFloorsEl = document.getElementById('floors');
  const noOfLiftsEl = document.getElementById('lifts');
  noOfFloors = noOfFloorsEl.value;
  noOfLifts = noOfLiftsEl.value;

  if (noOfFloors === '' || noOfFloors === 0 || noOfLifts === '') {
    alert('Please enter the number of floors and lifts!');
  } else {
    liftSimulationContainer.classList.remove('hide');
    inputContainer.classList.add('hide');
  }

  buildLiftSimulationUI(noOfFloors, noOfLifts);
  simulateLifts();
});

const buildLiftSimulationUI = (floors, lifts) => {
  const container = document.getElementsByClassName('floors-container')[0];
  let liftContainerWidth = null;

  for (let i = 0; i < floors; i++) {
    const floor = document.createElement('div');
    floor.className = 'floor';

    const floorButtonContainer = document.createElement('div');
    floorButtonContainer.className = 'floor-button-container';

    if (i !== floors - 1) {
      const upButton = document.createElement('button');
      upButton.className = 'floor-button';
      upButton.innerText = '🔼';
      floorButtonContainer.appendChild(upButton);
    }

    if (i !== 0) {
      const downButton = document.createElement('button');
      downButton.className = 'floor-button';
      downButton.innerText = '🔽';
      floorButtonContainer.appendChild(downButton);
    }

    const liftContainer = document.createElement('div');
    liftContainer.className = 'lift-container';

    if (i === 0) {
      for (let j = 0; j < lifts; j++) {
        const lift = document.createElement('div');
        lift.className = `lift lift-${j + 1}`;
        liftContainer.appendChild(lift);
      }
    }

    // Setting the width of the grounf floor lift container to the other floor lift containers
    if (i !== 0) {
      liftContainer.style.width = liftContainerWidth + 'px';
    }

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


// Logic for the simulating lifts

const simulateLifts = () => {
  class Lift {
    constructor() {
      this.currentFloor = 0;
      this.direction = 'up';
      this.isMoving = false;
    }
  }

  // Creating instances of Lift given by user
  function createLifts(n) {
    const lifts = [];
    for (let i = 0; i < n; i++) {
      const lift = new Lift();
      lifts.push(lift);
    }
    return lifts;
  }

  const lifts = createLifts(noOfLifts);
  console.log(lifts);
};
