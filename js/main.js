const chucky = document.getElementById("chucky");
const toyStory = document.getElementById("TS4");
const rocketMan = document.getElementById("rocketman");
const MIB = document.getElementById("MIB");
const scrollDiv = document.getElementById("scroll-div");

const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const btn4 = document.getElementById("btn-4");

function scrolltop(e) {
  let btn = e.target;
  btn1.classList.remove("current-movie");
  btn2.classList.remove("current-movie");
  btn3.classList.remove("current-movie");
  btn4.classList.remove("current-movie");
  btn.classList.add("current-movie");
  let top;
  switch (btn) {
    case btn1:
      top = MIB.offsetTop;
      break;
    case btn2:
      top = toyStory.offsetTop;
      break;
    case btn3:
      top = rocketMan.offsetTop;
      break;
    case btn4:
      top = chucky.offsetTop;
      break;
  }

  // scrollDiv.scrollTop = top - MIB.offsetTop;
  scrollDiv.scrollTo({
    top: top - MIB.offsetTop,
    left: 0,
    behavior: "smooth"
  });
}

btn1.addEventListener("click", scrolltop);
btn2.addEventListener("click", scrolltop);
btn3.addEventListener("click", scrolltop);
btn4.addEventListener("click", scrolltop);
console.log(MIB.offsetTop);
console.log(toyStory.offsetTop);
console.log(rocketMan.offsetTop);
console.log(chucky.offsetTop);
