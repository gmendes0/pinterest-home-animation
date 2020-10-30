const grids = document.querySelectorAll(".grid");
const headings = document.querySelectorAll(".heading .wrapper .text");

const enterScreen = (index) => {
  const grid = grids[index];
  const heading = headings[index];
  const gridColumns = grid.querySelectorAll(".column");

  grid.classList.add("active");

  gridColumns.forEach((column) => column.classList.remove("animate-before"));

  heading.classList.remove("animate-before");
};

const exitScreen = (index, exitDelay) => {
  const grid = grids[index];
  const heading = headings[index];
  const gridColumns = grid.querySelectorAll(".column");

  gridColumns.forEach((column) => column.classList.add("animate-after"));
  heading.classList.add("animate-after");

  setTimeout(() => {
    grid.classList.remove("active");

    gridColumns.forEach((column) => {
      column.classList.add("animate-before");
      column.classList.remove("animate-after");
    });

    heading.classList.add("animate-before");
    heading.classList.remove("animate-after");
  }, exitDelay);
};

const setUpAnimationCycle = ({ timePerScreen, exitDelay }) => {
  const cycleTime = timePerScreen + exitDelay;
  let nextIndex = 0;

  const nextCycle = () => {
    const currentIndex = nextIndex;

    enterScreen(currentIndex);

    setTimeout(() => {
      exitScreen(currentIndex, exitDelay);
    }, timePerScreen);

    nextIndex = nextIndex < grids.length - 1 ? nextIndex + 1 : 0;
  };

  nextCycle();

  setInterval(nextCycle, cycleTime);
};

setUpAnimationCycle({
  timePerScreen: 5000,
  exitDelay: 200 * 7, // columns-transition-delay * columns
});
