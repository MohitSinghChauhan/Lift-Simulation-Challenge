const submitBtn = document.getElementById('submit');
const inputContainer = document.getElementsByClassName('input-container')[0];
const liftSimulationContainer = document.getElementsByClassName(
  'lift-simulation-container'
)[0];

// Initialized lift
let noOfFloors = 8;
let noOfLifts = 6;

// submitBtn.addEventListener('click', () => {
//   const noOfFloorsEl = document.getElementById('floors');
//   const noOfLiftsEl = document.getElementById('lifts');
//   noOfFloors = noOfFloorsEl.value;
//   noOfLifts = noOfLiftsEl.value;

//   if (noOfFloors === '' || noOfFloors === 0 || noOfLifts === '') {
//     alert('Please enter the number of floors and lifts!');
//   } else {
liftSimulationContainer.classList.remove('hide');
inputContainer.classList.add('hide');
//   }

//   buildLiftSimulationUI(noOfFloors, noOfLifts);
//   simulateLifts();
// });

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
      upButton.setAttribute('data-floor', (i + 1).toString());
      floorButtonContainer.appendChild(upButton);
    }

    if (i !== 0) {
      const downButton = document.createElement('button');
      downButton.className = 'floor-button';
      downButton.innerText = '🔽';
      downButton.setAttribute('data-floor', (i + 1).toString());
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
  }
};

// Logic for the simulating lifts
const simulateLifts = () => {
  // Add event listeners to all floor buttons
  const floorButtons = document.querySelectorAll('.floor-button');
  floorButtons.forEach((button) => {
    button.addEventListener('click', handleFloorButtonClick);
  });

  class Lift {
    constructor() {
      this.domEl = null;
      this.currentFloor = 1;
      this.isMoving = false;
      this.targetFloor = 0;
      this.floorHeight = 120; // height of 1 floor in px
    }
  }

  // Create instances of Lift given by user
  function createLifts(numLifts) {
    const lifts = [];
    for (let i = 0; i < numLifts; i++) {
      const lift = new Lift();
      lift.domEl = document.querySelector(`.lift-${i + 1}`);
      lifts.push(lift);
    }
    return lifts;
  }

  const lifts = createLifts(noOfLifts);
  console.log(lifts);

  // Handle floor button click event
  function handleFloorButtonClick(event){
    const targetFloor = parseInt(event.target.dataset.floor);
    requestLift(targetFloor); // Call the function to handle the requested floor
  };

  const requestLift = (requestedFloor) => {
    const selectedLift = selectLift(requestedFloor);
    selectedLift.targetFloor = requestedFloor;
    moveLift(selectedLift);
  };

  const moveLift = (selectedLift) => {
    const floorsInBetween = selectedLift.targetFloor - selectedLift.currentFloor;
    const distance = Math.abs(floorsInBetween) * selectedLift.floorHeight;
    const transitionTime = Math.abs(floorsInBetween) * 2000;

    selectedLift.isMoving = true;

    const liftElement = selectedLift.domEl;
    const computedTransform = liftElement.style.transform;
    const translateYValue = computedTransform ? Math.abs(parseInt(computedTransform.match(/-?\d+/)[0])) : 0;

    liftElement.style.transition = `transform ${transitionTime}ms ease-in-out`;
    if (floorsInBetween > 0)
      liftElement.style.transform = `translateY(-${distance + translateYValue}px)`;
    else
      liftElement.style.transform = `translateY(-${Math.abs(distance - translateYValue)}px)`;

    setTimeout(() => {
      selectedLift.isMoving = false;
      selectedLift.currentFloor = selectedLift.targetFloor;
    }, transitionTime);
  };

  const selectLift = (floor) => {
    let selectedLift = null;
    let minDistance = Infinity;

    for (const lift of lifts) {
      const distance = Math.abs(lift.currentFloor - floor);
      if (distance < minDistance && !lift.isMoving) {
        minDistance = distance;
        selectedLift = lift;
      }
    }

    // If no stationary lifts are available, find the nearest lift
    if (!selectedLift) {
      for (const lift of lifts) {
        const distance = Math.abs(lift.currentFloor - floor);
        if (distance < minDistance) {
          minDistance = distance;
          selectedLift = lift;
        }
      }
    }

    return selectedLift;
  };
};

// Temporary changes to skip every time inputs of lift and floors
buildLiftSimulationUI(noOfFloors, noOfLifts);
simulateLifts();
